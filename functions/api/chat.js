export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        const body = await request.json();
        const chatHistory = body.contents || [];

        if (!env.GEMINI_API_KEY) {
            return new Response(
                JSON.stringify({ error: "Sunucu tarafında GEMINI_API_KEY tanımlanmamış." }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }

        const SYSTEM_PROMPT = `
Sen "TEKNİK OTO FREN SERVİSİ"nin resmi, güler yüzlü ve uzman teknik danışman asistanısın.
İşletme Bilgileri:
- Konum: Barış Mah. Arap Hacı Caddesi, Sanayi Sitesi 91/L, Safranbolu / Karabük.
- Telefonlar: Ana Hat & WhatsApp: 0542 326 42 71 | Dükkan Sabit Hat: 0370 712 42 69.
- Çalışma Saatleri: Pazartesi - Cumartesi 08:30 - 20:30 (Pazar günleri kapalıyız).
- Uzmanlık Alanları: Fren balatası değişimi, fren diskleri kontrol ve değişimi, fren merkezi ve hidrolik sistem onarımı, ABS / ESP arıza tespiti, fren hidroliği yenileme, TÜVTÜRK muayene öncesi fren kontrolü.
- Puan: Google'da 4.9/5 puan (119 yorum), Yandex'te 5.0/5 puan.
- İşlem Süreleri: Standart ön veya arka balata değişimi 30-45 dk, disk + balata takım değişimi kaliper temizliğiyle birlikte ortalama 1 - 1.5 saat sürer.

Kurallar:
1. Müşteriye samimi, güven veren, kısa ve anlaşılır (maksimum 3-4 cümle) Türkçe yanıtlar ver.
2. Teknik arıza belirtilerinde (ses, titreme, pedal boşluğu, ABS ışığı vb.) olası teknik sebebi açıkla ve güvenlik açısından kontrol öner.
3. Net parça/işçilik fiyatı sorulursa aracın marka-model-yıl ve motor tipine göre değiştiğini belirtip WhatsApp veya telefon üzerinden ustamızdan kesin fiyat alabileceğini söyle.
4. Konu dışı (siyaset, spor, genel sohbet vb.) sorulara kibarca sadece oto fren sistemleri ve servisimiz hakkında yardımcı olabileceğini belirt.
`;

        const geminiResponse = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    systemInstruction: {
                        parts: [{ text: SYSTEM_PROMPT }]
                    },
                    contents: chatHistory,
                    generationConfig: {
                        temperature: 0.6,
                        maxOutputTokens: 300
                    }
                })
            }
        );

        const data = await geminiResponse.json();

        if (!geminiResponse.ok) {
            return new Response(
                JSON.stringify({ error: "Gemini API hatası", details: data }),
                { status: geminiResponse.status, headers: { "Content-Type": "application/json" } }
            );
        }

        const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Şu an yanıt oluşturulamadı.";

        return new Response(
            JSON.stringify({ reply: aiText }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );

    } catch (err) {
        return new Response(
            JSON.stringify({ error: "Sunucu işleme hatası" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}