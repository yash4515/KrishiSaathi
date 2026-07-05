const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || "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";

// Smart Client-Side Agricultural Assistant Fallback Engine
const getFallbackAIResponse = (userMessage) => {
    const msg = userMessage.toLowerCase().trim();

    // Check if Hindi script is used (Devanagari)
    const isHindiScript = /[\u0900-\u097F]/.test(userMessage);

    // 1. GREETINGS & HELP
    if (
        msg.includes('hi') || msg.includes('hello') || msg.includes('hey') || 
        msg.includes('namaste') || msg.includes('pranam') || msg.includes('help') || 
        msg.includes('madad') || msg.includes('kaise ho') || msg.includes('who are you') ||
        msg.includes('सहायता') || msg.includes('नमस्ते') || msg.includes('मदद')
    ) {
        if (isHindiScript) {
            return `राम-राम! 🙏 मैं KrishiSaathi सहायक हूँ। मैं आपकी खेती संबंधी समस्याओं में मदद कर सकता हूँ।

आप नीचे दिए गए विकल्पों पर क्लिक कर सकते हैं या लिख सकते हैं:
🌾 **मंडी भाव (Mandi Prices)** - आज के ताजा फसल दर
🌧️ **मौसम की जानकारी (Weather)** - वर्षा और कृषि सलाह
🚜 **फसल बेचें (Sell Crops)** - सीधे खरीदारों से जुड़ें
🛡️ **फसल बीमा (Crop Insurance)** - नुकसान से सुरक्षा
🐛 **रोग पहचान (Disease Detection)** - पत्ती के रोग की पहचान
🌱 **कृषि स्टोर (Agri Store)** - बढ़िया बीज व खाद

बताएं, आज मैं आपकी क्या सेवा कर सकता हूँ?`;
        }
        return `Namaste! 🙏 I am KrishiSaathi, your digital farming assistant. I can help you with:

🌾 **Mandi Prices** - Current crop rates and alerts
🌧️ **Weather Forecast** & crop advisory
🚜 **Sell Crops** - Place listings on our marketplace
🛡️ **Crop Insurance** - Protect your yields against losses
🐛 **Disease Detection** - Identify leaf disease instantly
🌱 **Agri Store** - High-quality inputs and seeds

How can I help you today? (You can type your query or use the quick buttons below!)`;
    }

    // 2. MANDI / CROP PRICES
    if (
        msg.includes('price') || msg.includes('rate') || msg.includes('daam') || 
        msg.includes('bhav') || msg.includes('mandi') || msg.includes('wheat') || 
        msg.includes('rice') || msg.includes('chawal') || msg.includes('dhan') || 
        msg.includes('onion') || msg.includes('pyaaj') || msg.includes('tomato') || 
        msg.includes('tamatar') || msg.includes('potato') || msg.includes('aloo') ||
        msg.includes('भाव') || msg.includes('दर') || msg.includes('मंडी') || 
        msg.includes('गेहूं') || msg.includes('धान') || msg.includes('प्याज') || msg.includes('टमाटर')
    ) {
        if (isHindiScript || msg.includes('bhav') || msg.includes('daam')) {
            return `🌾 **ताजा मंडी भाव और बाजार रुझान:**

प्रमुख मंडियों में आज के अनुमानित औसत भाव इस प्रकार हैं:
• **गेहूं (Wheat):** ₹2,400 - ₹2,750 / क्विंटल
• **धान (Paddy/Rice):** ₹2,180 - ₹2,500 / क्विंटल
• **प्याज (Onion):** ₹1,800 - ₹2,400 / क्विंटल
• **टमाटर (Tomato):** ₹2,200 - ₹3,000 / क्विंटल

👉 *सलाह:* लाइव मंडी भाव, न्यूनतम समर्थन मूल्य (MSP) और बाजार समाचार देखने के लिए हमारे [कृषि समाचार / Newsletter](/newsletter) पेज पर जाएं!`;
        }
        return `🌾 **Mandi Prices & Market Trends:**

Average estimated rates across major mandis today:
• **Wheat (गेहूं):** ₹2,400 - ₹2,750 per quintal
• **Rice/Paddy (धान):** ₹2,180 - ₹2,500 per quintal
• **Onion (प्याज):** ₹1,800 - ₹2,400 per quintal
• **Tomato (टमाटर):** ₹2,200 - ₹3,000 per quintal

👉 *Pro Tip:* You can view real-time Mandi Prices, NCDEX alerts, and Minimum Support Prices (MSP) by visiting our [Krishi Samachar / Newsletter](/newsletter) page!`;
    }

    // 3. WEATHER
    if (
        msg.includes('weather') || msg.includes('mausam') || msg.includes('rain') || 
        msg.includes('barish') || msg.includes('barsat') || msg.includes('humidity') || 
        msg.includes('forecast') || msg.includes('तापमान') || msg.includes('मौसम') || 
        msg.includes('बारिश') || msg.includes('वर्षा')
    ) {
        if (isHindiScript || msg.includes('mausam') || msg.includes('barish')) {
            return `🌧️ **मौसम पूर्वानुमान और कृषि सलाह:**

• **पूर्वानुमान:** अगले 3 दिनों में उत्तर और मध्य भारत के क्षेत्रों में सामान्य वर्षा की संभावना है।
• **कृषि सलाह:** यदि आपके क्षेत्र में भारी बारिश की चेतावनी है, तो फसलों में यूरिया या कीटनाशकों का छिड़काव न करें। जलभराव से बचने के लिए खेतों में जल निकासी की व्यवस्था करें।

👉 दैनिक स्थानीय मौसम और सटीक पूर्वानुमान के लिए कृपया रजिस्टर कर अपना [डैशबोर्ड](/#) देखें।`;
        }
        return `🌧️ **Weather Update & Advisory:**

• **Forecast:** Normal monsoon conditions with moderate rainfall expected over Northern & Central regions in the next 3 days.
• **Advisory:** Avoid spraying pesticides or applying urea if heavy rain is forecast in your area. Ensure proper drainage in vegetable fields to prevent root rot.

👉 For local daily forecasts and personalized weather alerts, please register and check your [Dashboard](/#).`;
    }

    // 4. FERTILIZER / CROP ADVICE
    if (
        msg.includes('fertilizer') || msg.includes('urea') || msg.includes('khad') || 
        msg.includes('pesticide') || msg.includes('insecticide') || msg.includes('weed') || 
        msg.includes('dawa') || msg.includes('organic') || msg.includes('soil') ||
        msg.includes('खाद') || msg.includes('कीटनाशक') || msg.includes('दवाई') || msg.includes('मिट्टी')
    ) {
        if (isHindiScript || msg.includes('khad') || msg.includes('dawa')) {
            return `🌱 **फसल पोषण और खाद संबंधी सलाह:**

• **बुवाई के समय:** अनाज फसलों (गेहूं/धान) के लिए बुवाई के समय NPK (12:32:16) का संतुलित उपयोग करें।
• **टॉप ड्रेसिंग:** सिंचाई या निराई के बाद ही यूरिया (Urea) का छिड़काव करें।
• **जैविक विकल्प:** मिट्टी की गुणवत्ता सुधारने के लिए नीम खली या केंचुआ खाद (Vermicompost) का उपयोग करें।

👉 सरकारी सब्सिडी दरों पर असली खाद, उन्नत बीज और कीटनाशक खरीदने के लिए हमारे [कृषि स्टोर](/store) पर जाएं!`;
        }
        return `🌱 **Crop Nutrition & Fertilizer Advisory:**

• **Basal Dose:** For grains like wheat/paddy, use a balanced mix of NPK (12:32:16) at sowing.
• **Top Dressing:** Apply Urea (46% N) in split doses, preferably after irrigation or weeding.
• **Organic Alternatives:** Use Neem Cake or Vermicompost to improve soil organic carbon.

👉 Explore the [Agri Store](/store) to buy authentic fertilizers, high-yield seeds, and pest control inputs at government-subsidized rates!`;
    }

    // 5. CROP INSURANCE
    if (
        msg.includes('insurance') || msg.includes('bima') || msg.includes('claim') || 
        msg.includes('pmfby') || msg.includes('suraksha') || msg.includes('loss') || 
        msg.includes('nuksan') || msg.includes('बीमा') || msg.includes('नुकसान')
    ) {
        if (isHindiScript || msg.includes('bima') || msg.includes('nuksan')) {
            return `🛡️ **फसल बीमा (Fasal Bima) जानकारी:**

**प्रधानमंत्री फसल बीमा योजना (PMFBY)** के अंतर्गत अपनी फसल को सूखा, बाढ़ और कीटों से सुरक्षित करें:
• **प्रीमियम दरें:** खरीफ फसलें (2%), रबी फसलें (1.5%), व्यावसायिक/बागवानी फसलें (5%)।
• **लाभ:** सरकारी सर्वेक्षण के बाद दावा राशि (claim) सीधे आपके बैंक खाते में भेजी जाती है।

👉 प्रीमियम की गणना करने और आवेदन करने के लिए हमारे [फसल बीमा](/insurance) पेज पर जाएं।`;
        }
        return `🛡️ **Crop Insurance (Fasal Bima):**

Protect your farm against droughts, floods, and pests under the **Pradhan Mantri Fasal Bima Yojana (PMFBY)**:
• **Premium Rates:** Kharif Crops (2%), Rabi Crops (1.5%), Commercial/Horticulture (5%).
• **Key Benefit:** Direct bank transfer of claims post state-government survey.

👉 You can calculate premium rates and apply for insurance on our [Crop Insurance](/insurance) page.`;
    }

    // 6. SCHEMES & SUBSIDIES
    if (
        msg.includes('scheme') || msg.includes('yojana') || msg.includes('subsidy') || 
        msg.includes('pm kisan') || msg.includes('sarkari') || msg.includes('yojna') ||
        msg.includes('योजना') || msg.includes('सब्सिडी') || msg.includes('सरकारी')
    ) {
        if (isHindiScript || msg.includes('yojana') || msg.includes('subsidy')) {
            return `🏛️ **सक्रिय सरकारी योजनाएं व सब्सिडी:**

वर्तमान में आप इन महत्वपूर्ण योजनाओं का लाभ उठा सकते हैं:
1. **पीएम-किसान (PM-KISAN):** सालाना ₹6,000 की वित्तीय सहायता (3 किश्तों में)।
2. **कृषि यंत्र सब्सिडी:** ट्रैक्टर, रोटावेटर और ड्रिप सिंचाई किट पर 40% से 50% तक की छूट।
3. **मृदा स्वास्थ्य कार्ड (Soil Health Card):** खेत की मिट्टी की मुफ्त जांच और सिफारिशें।

👉 विस्तृत पात्रता मानदंड और सीधे लिंक के लिए हमारे [कृषि समाचार / Newsletter](/newsletter) पेज पर 'Schemes' टैब देखें!`;
        }
        return `🏛️ **Active Government Schemes & Subsidies:**

Here are some top schemes you can benefit from today:
1. **PM-KISAN:** Get ₹6,000 yearly support in 3 equal installments.
2. **Subsidies on Machinery:** 40% to 50% discount on tractors, rotavators, and drip irrigation kits.
3. **Soil Health Card:** Get your soil tested for free and receive crop-specific fertilizer recommendations.

👉 Find active links and detailed eligibility criteria under the **Schemes** tab on our [Krishi Samachar / Newsletter](/newsletter) page!`;
    }

    // 7. SELLING / MARKETPLACE
    if (
        msg.includes('sell') || msg.includes('bech') || msg.includes('buyer') || 
        msg.includes('marketplace') || msg.includes('listing') || msg.includes('upload crop') || 
        msg.includes('bechna') || msg.includes('बेचना') || msg.includes('बाजार') || 
        msg.includes('खरीददार') || msg.includes('ग्राहक')
    ) {
        if (isHindiScript || msg.includes('bech')) {
            return `🚜 **फसल बेचना (Direct Selling to Buyers):**

KrishiSaathi के साथ दलालों को हटाकर सीधे ग्राहकों और व्यापारियों को अपनी फसल अच्छे दामों पर बेचें:
1. अपने अकाउंट में **लॉग इन / साइन अप** करें।
2. अपने **Farmer Dashboard** पर जाएं।
3. **Upload Crop** पर क्लिक करें और फसल का विवरण, अपेक्षित दाम और फोटो डालें।
4. खरीदार आपकी फसल देखकर सीधे बोली (bids) लगाएंगे!

👉 शुरू करने के लिए [साइन अप](/signup) करें या [मार्केटप्लेस](/marketplace) पर जाएं!`;
        }
        return `🚜 **Selling Crops directly to Buyers:**

KrishiSaathi helps you skip middlemen and sell at better rates:
1. **Log in / Sign up** to your account.
2. Go to your **Farmer Dashboard**.
3. Click **Upload Crop**, fill in details (quantity, price expectation, crop photos).
4. Buyers will browse your listing and place bids directly!

👉 Get started by visiting the [Marketplace](/marketplace) or [Sign Up](/signup) to list your crops today!`;
    }

    // 8. DISEASE DETECTION
    if (
        msg.includes('disease') || msg.includes('leaf') || msg.includes('spot') || 
        msg.includes('yellow') || msg.includes('fungus') || msg.includes('pest') || 
        msg.includes('detect') || msg.includes('diseased') || msg.includes('pila') || 
        msg.includes('patta') || msg.includes('rog') || msg.includes('कीड़ा') || 
        msg.includes('रोग') || msg.includes('पत्ती') || msg.includes('पीला')
    ) {
        if (isHindiScript || msg.includes('rog') || msg.includes('patta')) {
            return `🐛 **एआई फसल रोग पहचान (AI Disease Detection):**

अपनी फसलों को रोगों से बचाएं! हमारा AI स्कैनर पत्ती की बीमारी की तुरंत पहचान करता है:
1. बीमार पत्ते की एक साफ़ और नजदीक से फ़ोटो लें।
2. उसे हमारे बीमारी जांच स्कैनर में अपलोड करें।
3. तुरंत बीमारी का नाम और उसके निवारण के उपाय पाएं!

👉 इसे अभी आजमाने के लिए हमारे [फसल रोग पहचान](/detect) पेज पर जाएं।`;
        }
        return `🐛 **AI Disease Detection:**

Don't let pests ruin your hard work! Our AI scanner can identify leaf diseases instantly:
1. Take a clear, close-up photo of the affected crop leaf.
2. Upload it to our scanner.
3. Get instant diagnosis and expert treatment recommendations!

👉 Try it now on our [Disease Detection](/detect) page.`;
    }

    // DEFAULT FALLBACK
    if (isHindiScript) {
        return `धन्यवाद आपके संदेश के लिए! 🌾 मैं समझ सकता हूँ कि आप खेती से जुड़ी जानकारी चाहते हैं। 

कृप्या इनमें से किसी एक विषय के बारे में पूछें:
• **मंडी भाव (Mandi Prices)**
• **मौसम की जानकारी (Weather)**
• **सरकारी योजनाएं (Schemes)**
• **कीटनाशक और खाद सलाह (Fertilizers)**
• **फसल बेचना/खरीदना (Sell Crops)**
• **फसल रोग पहचान (Disease Detection)**

आप मुख्य विकल्पों को देखने के लिए 'Help' या 'नमस्ते' भी टाइप कर सकते हैं!`;
    }
    return `Thank you for your message! 🌾 I am checking the details for you.

Please ask me about topics like:
• **Mandi Prices** (e.g., "Wheat price today")
• **Weather Update** (e.g., "Is it going to rain?")
• **Government Schemes** (e.g., "PM Kisan subsidy")
• **Fertilizers & Crop Advice**
• **Selling Crops / Marketplace**
• **Disease Detection**

You can also type "Help" or "Namaste" to see the main menu!`;
};

export const sendMessageToOpenAI = async (messagesHistory) => {
    // 1. Try to make OpenAI API request
    try {
        // Formatting messages for OpenAI API
        const formattedMessages = [
            { role: "system", content: "You are KrishiSaathi, a helpful and knowledgeable agricultural assistant designed to help farmers in India. You provide advice on crop management, farming techniques, weather, current market prices of crops, government agricultural schemes and insurance. Keep your answers concise, practical, and friendly." },
            ...messagesHistory.map(msg => ({
                role: msg.sender === 'user' || msg.type === 'user' ? 'user' : 'assistant',
                content: msg.text
            }))
        ];

        // Only try OpenAI if the key doesn't look like a standard dummy key
        if (!OPENAI_API_KEY || OPENAI_API_KEY.includes("sk-proj-teBY2RFA")) {
            throw new Error("Invalid or dummy API Key detected. Using local smart agricultural AI engine.");
        }

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: formattedMessages,
                temperature: 0.7,
            })
        });

        if (!response.ok) {
            console.error("OpenAI API Error:", response.status, response.statusText);
            throw new Error(`API returned ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.warn("Using local smart agricultural AI engine fallback:", error.message);
        
        // Extract the last message text
        const lastUserMessage = messagesHistory[messagesHistory.length - 1]?.text || "";
        return getFallbackAIResponse(lastUserMessage);
    }
};
