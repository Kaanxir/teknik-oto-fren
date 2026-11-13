/* =========================================
   TEKNİK OTO FREN
   GÜVENLİ BACKEND (/api/chat) ENTEGRELİ JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const MAIN_WHATSAPP_NUMBER = "905423264271";
    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".navbar a");

    /* CANLI ÇALIŞMA SAATLERİ DURUMU */
    function updateLiveShopStatus() {
        const heroBadge = document.getElementById("heroLiveStatus");
        const contactStatus = document.getElementById("contactLiveStatus");

        const now = new Date();
        const trTime = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Istanbul" }));
        const day = trTime.getDay();
        const totalMinutes = trTime.getHours() * 60 + trTime.getMinutes();

        const isOpen = (day !== 0) && (totalMinutes >= 510 && totalMinutes < 1230); // 08:30 - 20:30

        if (heroBadge) {
            const textEl = heroBadge.querySelector(".status-text");
            if (isOpen) {
                heroBadge.classList.remove("closed");
                if (textEl) textEl.textContent = "ŞU AN AÇIK • 20:30'A KADAR HİZMETTEYİZ";
            } else {
                heroBadge.classList.add("closed");
                if (textEl) {
                    textEl.textContent = day === 0
                        ? "PAZAR KAPALI • PAZARTESİ 08:30'DA AÇIK"
                        : "ŞU AN KAPALI • 08:30 - 20:30 ARASI AÇIK";
                }
            }
        }

        if (contactStatus) {
            if (isOpen) {
                contactStatus.textContent = "● Şu an açığız (Pazar kapalı)";
                contactStatus.classList.add("open");
                contactStatus.classList.remove("closed");
            } else {
                contactStatus.textContent = "● Şu an kapalıyız (Pazar günleri kapalı)";
                contactStatus.classList.add("closed");
                contactStatus.classList.remove("open");
            }
        }
    }

    updateLiveShopStatus();
    setInterval(updateLiveShopStatus, 60000);

    /* İSTATİSTİK SAYAÇLARI ANİMASYONU */
    const counters = document.querySelectorAll(".counter");
    let countersStarted = false;

    function animateCounters() {
        if (countersStarted) return;
        const statsBar = document.querySelector(".stats-bar");
        if (!statsBar) return;

        if (statsBar.getBoundingClientRect().top < window.innerHeight - 40) {
            countersStarted = true;
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute("data-target"), 10);
                const duration = 1400;
                const stepTime = 25;
                const steps = Math.max(1, Math.floor(duration / stepTime));
                const increment = target / steps;
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, stepTime);
            });
        }
    }

    /* SCROLL REVEAL, AKTİF MENÜ & YUKARI ÇIK */
    const revealElements = document.querySelectorAll(".reveal");
    const sections = document.querySelectorAll("main section[id]");
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    function handleScrollEffects() {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;

        animateCounters();

        revealElements.forEach(el => {
            if (el.getBoundingClientRect().top < windowHeight - 70) {
                el.classList.add("visible");
            }
        });

        let currentSectionId = "";
        sections.forEach(sec => {
            const sectionTop = sec.offsetTop - 160;
            const sectionHeight = sec.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = sec.getAttribute("id");
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${currentSectionId}`) {
                    link.classList.add("active");
                }
            });
        }

        if (scrollTopBtn) {
            scrollTopBtn.classList.toggle("visible", scrollY > 500);
        }
    }

    window.addEventListener("scroll", handleScrollEffects, { passive: true });
    handleScrollEffects();

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* S.S.S. AKORDİYON */
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
        const questionBtn = item.querySelector(".faq-question");
        if (!questionBtn) return;

        questionBtn.addEventListener("click", () => {
            const isAlreadyOpen = item.classList.contains("active");
            faqItems.forEach(otherItem => {
                otherItem.classList.remove("active");
                const btn = otherItem.querySelector(".faq-question");
                if (btn) btn.setAttribute("aria-expanded", "false");
            });

            if (!isAlreadyOpen) {
                item.classList.add("active");
                questionBtn.setAttribute("aria-expanded", "true");
            }
        });
    });

    /* MOBİL MENÜ */
    if (menuToggle && navbar) {
        function closeMenu() {
            navbar.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }

        menuToggle.addEventListener("click", () => {
            const isOpen = navbar.classList.contains("active");
            if (isOpen) {
                closeMenu();
            } else {
                navbar.classList.add("active");
                menuToggle.classList.add("active");
                menuToggle.setAttribute("aria-expanded", "true");
            }
        });

        navLinks.forEach(link => link.addEventListener("click", closeMenu));
        document.addEventListener("click", e => {
            if (!navbar.contains(e.target) && !menuToggle.contains(e.target)) closeMenu();
        });
    }

    /* GOOGLE & YANDEX YORUMLARI */
    const googleReviews = [
        {
            author: "Seçkin Ceylan",
            initial: "S",
            date: "1 ay önce • Google Yorumu",
            text: "Bugün gittim balata taktırmaya dediklerinde fazlası var aracımla çok ilgilendiler bilgilendirdiler para ikinci planda ondan çok kolaylık sağladılar en güzeli sıcakkanlılar çayımızı içtik muhabbetimizi ettik nasip olursa araç bakımında orda yaptırcam Allah hepsinde razı olsun güzel insanlar teşekkür ediyorum."
        },
        {
            author: "İsa Gül",
            initial: "İ",
            date: "Yerel Rehber • Google Yorumu",
            text: "Aracımın frenlerini mahveden, moralimi alt üst eden bir frenciden sonra tanıdık tavsiyesi ile Emrullah ustama gittim. Ben böyle mükemmel işçilik görmedim. Allah razı olsun. Güleryüz, hizmet, açıklama, temizlik herşeyi ile mükemmel. Ustama ve kısaca Teknik oto fren servisi ailesine teşekkür ediyorum."
        },
        {
            author: "Ahmet Kaan",
            initial: "A",
            date: "7 ay önce • Google Yorumu",
            text: "Aracımın fren balataları ve diskleri değişti, ayrıca genel kontrolünü de yaptılar. İşçilik gerçekten çok temiz ve titizdi. Ustalar hem güler yüzlü hem de işinin ehli, yapılan her işlemi tek tek anlatıp bilgilendirdiler. Fiyat konusunda da yardımcı oldular. Karabük’te frenci arayan herkese gönül rahatlığıyla tavsiye ederim."
        },
        {
            author: "Umut Danışman",
            initial: "U",
            date: "1 ay önce • Google Yorumu",
            text: "Aracımın balataları değişti ayrıyeten bakımları da yapıldı işi çok titiz temiz yapıyorlar herkese gönül rahatlığıyla tavsiye ederim."
        },
        {
            author: "Yandex Kullanıcısı",
            initial: "Y",
            date: "3 ay önce • Yandex Yorumu",
            text: "Kesinlikle işinin ehli insanlar gayet ilgili ve alakalılar aynı zamanda kesinlikle tavsiye ederim."
        }
    ];

    let currentReviewIndex = 0;
    const previewCard = document.getElementById("reviewPreviewCard");
    const previewAvatar = document.getElementById("previewAvatar");
    const previewAuthor = document.getElementById("previewAuthor");
    const previewDate = document.getElementById("previewDate");
    const previewText = document.getElementById("previewText");
    const prevReviewBtn = document.getElementById("prevReviewBtn");
    const nextReviewBtn = document.getElementById("nextReviewBtn");

    function updatePreviewReview(index) {
        if (!previewCard) return;
        const rev = googleReviews[index];
        previewCard.style.opacity = "0.4";
        setTimeout(() => {
            previewAvatar.textContent = rev.initial;
            previewAuthor.textContent = rev.author;
            previewDate.textContent = rev.date;
            previewText.textContent = `"${rev.text}"`;
            previewCard.style.opacity = "1";
        }, 150);
    }

    if (prevReviewBtn && nextReviewBtn) {
        prevReviewBtn.addEventListener("click", () => {
            currentReviewIndex = (currentReviewIndex - 1 + googleReviews.length) % googleReviews.length;
            updatePreviewReview(currentReviewIndex);
        });
        nextReviewBtn.addEventListener("click", () => {
            currentReviewIndex = (currentReviewIndex + 1) % googleReviews.length;
            updatePreviewReview(currentReviewIndex);
        });
    }

    const reviewsModal = document.getElementById("reviewsModal");
    const openReviewsModalBtn = document.getElementById("openReviewsModalBtn");
    const reviewsModalClose = document.getElementById("reviewsModalClose");
    const allReviewsList = document.getElementById("allReviewsList");

    if (reviewsModal && openReviewsModalBtn && allReviewsList) {
        allReviewsList.innerHTML = googleReviews.map(rev => `
            <div class="modal-review-item">
                <div class="review-preview-top">
                    <div class="review-avatar">${rev.initial}</div>
                    <div>
                        <h4>${rev.author}</h4>
                        <span>${rev.date}</span>
                    </div>
                    <div class="review-card-stars">★★★★★</div>
                </div>
                <p>"${rev.text}"</p>
            </div>
        `).join("");

        openReviewsModalBtn.addEventListener("click", () => {
            reviewsModal.classList.add("active");
            document.body.style.overflow = "hidden";
        });

        const closeReviews = () => {
            reviewsModal.classList.remove("active");
            document.body.style.overflow = "";
        };

        reviewsModalClose.addEventListener("click", closeReviews);
        reviewsModal.addEventListener("click", e => { if (e.target === reviewsModal) closeReviews(); });
    }

    /* HİZMET DETAY MODALI */
    const serviceData = {
        balata: {
            number: "01",
            title: "Fren Balatası Kontrol & Değişimi",
            desc: "Aracınızın durma mesafesini doğrudan belirleyen fren balatalarının kalınlık ölçümü, yüzey kontrolü ve aracınıza tam uyumlu yüksek kaliteli balatalarla değişimini gerçekleştiriyoruz.",
            symptoms: [
                "Frene basıldığında gelen metalik sürtme veya ıslık sesi",
                "Gösterge panelinde fren balatası ikaz ışığının yanması",
                "Fren mesafesinin normalden fazla uzaması"
            ],
            whatsappText: "Merhaba TEKNİK OTO FREN, Fren Balatası kontrolü / değişimi hakkında bilgi almak istiyorum."
        },
        disk: {
            number: "02",
            title: "Fren Diskleri Kontrol & Değişimi",
            desc: "Isınma ve aşınmaya bağlı olarak eğilen, çizilen veya incelen fren disklerinin mikrometrik ölçümünü yapıyor, güvenli sürüş standartlarına göre değişim işlemlerini uyguluyoruz.",
            symptoms: [
                "Yüksek hızlarda frene basıldığında direksiyonda titreme",
                "Fren pedalında vuruntu veya dalgalanma hissi",
                "Disk yüzeyinde derin fatura ve çizik oluşumu"
            ],
            whatsappText: "Merhaba TEKNİK OTO FREN, Fren Diskleri kontrolü / değişimi hakkında bilgi almak istiyorum."
        },
        merkez: {
            number: "03",
            title: "Fren Merkezi & Hidrolik Sistem",
            desc: "Fren pedalından gelen basıncı tekerleklere ileten ana fren merkezi ve kaliper pistonlarının sızdırmazlık ve basınç testlerini titizlikle yapıyoruz.",
            symptoms: [
                "Fren pedalının yavaşça dibe doğru çökmesi",
                "Pedalın normalden aşırı yumuşak veya süngerimsi olması",
                "Fren merkezinde veya rekorlarda hidrolik kaçak izi"
            ],
            whatsappText: "Merhaba TEKNİK OTO FREN, Fren Merkezi arızası / kontrolü hakkında bilgi almak istiyorum."
        },
        abs: {
            number: "04",
            title: "ABS Sistemleri Arıza Tespiti",
            desc: "Ani frenlemelerde tekerleklerin kilitlenmesini önleyen ABS sisteminin sensör, beyin ve pompa kontrollerini profesyonel arıza tespit cihazlarıyla gerçekleştiriyoruz.",
            symptoms: [
                "Gösterge panelinde ABS veya ESP arıza lambasının yanması",
                "Ani frenlerde tekerleklerin kızaklaması",
                "Tekerlek hız sensörü veya kablo tesisatı kopuklukları"
            ],
            whatsappText: "Merhaba TEKNİK OTO FREN, ABS sistemi arıza tespiti için bilgi almak istiyorum."
        },
        hidrolik: {
            number: "05",
            title: "Fren Hidroliği Kontrol & Değişimi",
            desc: "Zamanla nem çekerek kaynama noktası düşen fren hidrolik sıvısının testini yapıyor, sistem havasını alarak DOT standartlarına uygun yenileme sağlıyoruz.",
            symptoms: [
                "Son hidrolik değişiminin üzerinden 2 yıl veya 40.000 km geçmiş olması",
                "Uzun inişlerde fren performansında belirgin düşüş (fren şişmesi)",
                "Hidrolik haznesindeki sıvının renginin koyulaşması"
            ],
            whatsappText: "Merhaba TEKNİK OTO FREN, Fren Hidroliği değişimi hakkında bilgi almak istiyorum."
        },
        genel: {
            number: "06",
            title: "Kapsamlı Genel Fren Bakımı",
            desc: "Uzun yol öncesi veya periyodik bakımlarda ön-arka balatalar, diskler, el freni mekanizması, hortumlar ve hidrolik dahil tüm fren sistemini baştan sona kontrol ediyoruz.",
            symptoms: [
                "Uzun yolculuk veya araç muayenesi (TÜVTÜRK) öncesi hazırlık",
                "Frenleme sırasında aracın sağa veya sola çekme yapması",
                "El freninin yeterince tutmaması veya çok yukarıda kavraması"
            ],
            whatsappText: "Merhaba TEKNİK OTO FREN, Genel Fren Bakımı / Muayene öncesi kontrol için bilgi almak istiyorum."
        }
    };

    const modal = document.getElementById("serviceModal");
    const modalClose = document.getElementById("modalClose");
    const serviceCards = document.querySelectorAll(".service-card[data-service]");

    function openServiceModal(key) {
        const data = serviceData[key];
        if (!data || !modal) return;

        document.getElementById("modalNumber").textContent = data.number;
        document.getElementById("modalTitle").textContent = data.title;
        document.getElementById("modalDesc").textContent = data.desc;

        const modalList = document.getElementById("modalList");
        modalList.innerHTML = "";
        data.symptoms.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            modalList.appendChild(li);
        });

        document.getElementById("modalWhatsappBtn").href =
            `https://wa.me/${MAIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(data.whatsappText)}`;

        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    if (modal) {
        serviceCards.forEach(card => {
            card.addEventListener("click", () => openServiceModal(card.getAttribute("data-service")));
        });
        const closeSvc = () => { modal.classList.remove("active"); document.body.style.overflow = ""; };
        modalClose.addEventListener("click", closeSvc);
        modal.addEventListener("click", e => { if (e.target === modal) closeSvc(); });
    }

    /* HIZLI WHATSAPP FİYAT & RANDEVU FORMU */
    const quickQuoteForm = document.getElementById("quickQuoteForm");
    if (quickQuoteForm) {
        quickQuoteForm.addEventListener("submit", e => {
            e.preventDefault();
            const name = document.getElementById("customerName").value.trim();
            const car = document.getElementById("carModel").value.trim();
            const service = document.getElementById("serviceSelect").value;
            const note = document.getElementById("customerNote").value.trim();

            let message = `Merhaba TEKNİK OTO FREN,\n\n*Ad Soyad:* ${name}\n*Araç:* ${car}\n*İşlem:* ${service}\n`;
            if (note) message += `*Not / Şikayet:* ${note}\n`;
            message += `\nFiyat ve uygunluk hakkında bilgi alabilir miyim?`;

            window.open(`https://wa.me/${MAIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
        });
    }

    /* =====================================================
       TEKNİK OTO FREN GÜVENLİ YAPAY ZEKA ASİSTANI (/api/chat)
    ===================================================== */

    const chatbotToggleBtn = document.getElementById("chatbotToggleBtn");
    const chatbotWindow = document.getElementById("chatbotWindow");
    const chatbotCloseBtn = document.getElementById("chatbotCloseBtn");
    const chatbotMessages = document.getElementById("chatbotMessages");
    const chatbotForm = document.getElementById("chatbotForm");
    const chatbotInput = document.getElementById("chatbotInput");
    const quickChips = document.querySelectorAll("#chatbotQuickChips button");

    let chatHistory = [];

    function appendChatMessage(htmlText, sender = "bot", actionLink = null) {
        if (!chatbotMessages) return null;
        const msgDiv = document.createElement("div");
        msgDiv.className = `chat-msg ${sender}`;
        msgDiv.innerHTML = htmlText;

        if (actionLink) {
            const btn = document.createElement("a");
            btn.href = actionLink.url;
            btn.target = "_blank";
            btn.rel = "noopener noreferrer";
            btn.className = "chat-bot-action";
            btn.textContent = actionLink.label;
            msgDiv.appendChild(document.createElement("br"));
            msgDiv.appendChild(btn);
        }

        chatbotMessages.appendChild(msgDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        return msgDiv;
    }

    async function askServerAI(userMessage) {
        chatHistory.push({
            role: "user",
            parts: [{ text: userMessage }]
        });

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contents: chatHistory })
            });

            if (!response.ok) throw new Error("Sunucu hatası");

            const data = await response.json();
            const aiText = data.reply || "Şu an yanıt oluşturulamadı.";

            chatHistory.push({
                role: "model",
                parts: [{ text: aiText }]
            });

            const formattedHtml = aiText
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(/\n/g, "<br>");

            return {
                text: formattedHtml,
                action: {
                    label: "WHATSAPP'TAN USTAYA DANIŞ →",
                    url: `https://wa.me/${MAIN_WHATSAPP_NUMBER}?text=${encodeURIComponent("Merhaba TEKNİK OTO FREN, " + userMessage)}`
                }
            };

        } catch (err) {
            console.error("Asistan Bağlantı Hatası:", err);
            return {
                text: "Canlı asistan şu an yalnızca Cloudflare Pages yayını üzerinde aktiftir veya bağlantıda kısa bir gecikme oldu. Dilerseniz <strong>0542 326 42 71</strong> numarasından arayabilir ya da doğrudan WhatsApp'tan yazabilirsiniz.",
                action: {
                    label: "WHATSAPP İLE İLETİŞİME GEÇ →",
                    url: `https://wa.me/${MAIN_WHATSAPP_NUMBER}?text=${encodeURIComponent("Merhaba TEKNİK OTO FREN, " + userMessage)}`
                }
            };
        }
    }

    if (chatbotToggleBtn && chatbotWindow) {
        appendChatMessage("Merhaba! Ben <strong>Teknik Oto Fren Yapay Zeka Asistanı</strong>. Aracınızdaki fren belirtilerini, bakım sürelerini veya servisimizle ilgili her şeyi bana sorabilirsiniz.");

        function toggleChatbot(forceOpen = null) {
            const shouldOpen = forceOpen !== null ? forceOpen : !chatbotWindow.classList.contains("active");
            chatbotWindow.classList.toggle("active", shouldOpen);
            chatbotWindow.setAttribute("aria-hidden", String(!shouldOpen));
            chatbotToggleBtn.setAttribute("aria-expanded", String(shouldOpen));
            if (shouldOpen && chatbotInput) setTimeout(() => chatbotInput.focus(), 200);
        }

        chatbotToggleBtn.addEventListener("click", () => toggleChatbot());
        if (chatbotCloseBtn) chatbotCloseBtn.addEventListener("click", () => toggleChatbot(false));

        async function handleUserQuestion(questionText) {
            if (!questionText) return;
            appendChatMessage(questionText, "user");

            const typingEl = appendChatMessage("<em>Usta asistan yanıt hazırlıyor...</em>", "bot");
            const reply = await askServerAI(questionText);

            if (typingEl) typingEl.remove();
            appendChatMessage(reply.text, "bot", reply.action || null);
        }

        if (chatbotForm && chatbotInput) {
            chatbotForm.addEventListener("submit", e => {
                e.preventDefault();
                const text = chatbotInput.value.trim();
                if (!text) return;
                chatbotInput.value = "";
                handleUserQuestion(text);
            });
        }

        quickChips.forEach(chip => {
            chip.addEventListener("click", () => {
                handleUserQuestion(chip.getAttribute("data-q"));
            });
        });
    }

});