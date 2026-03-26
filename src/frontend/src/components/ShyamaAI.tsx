import { Globe, MessageCircle, Mic, MicOff, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Lang } from "../translations";
import { t } from "../translations";

interface ShyamaAIProps {
  lang: Lang;
  onLangChange: (l: Lang) => void;
  isOpen: boolean;
  onToggle: () => void;
}

interface Message {
  role: "user" | "bot";
  text: string;
  id: string;
}

function getBotResponse(input: string, lang: Lang): string {
  const q = input.toLowerCase().trim();

  if (lang === "en") {
    // Greetings
    if (
      q.match(
        /^(hi|hello|hey|namaste|good morning|good evening|good afternoon)/,
      )
    )
      return "Hello! I am Shyama, your BillKaro assistant. How can I help you today? You can ask me about features, pricing, how to create bills, or anything about BillKaro!";

    // Who am I
    if (
      q.includes("who are you") ||
      q.includes("who is Shyama") ||
      q.includes("your name") ||
      q.includes("what are you")
    )
      return "I am Shyama, the intelligent assistant for BillKaro, the GST billing app for grocery shops. I can answer all your questions about BillKaro!";

    // Thanks
    if (
      q.includes("thank") ||
      q.includes("shukriya") ||
      q.includes("dhanyawad") ||
      q === "ok" ||
      q === "okay" ||
      q.includes("got it") ||
      q.includes("great")
    )
      return "You are welcome! Feel free to ask if you have more questions about BillKaro.";

    // About BillKaro
    if (
      q.includes("what is billkaro") ||
      q.includes("about billkaro") ||
      (q.includes("billkaro") && q.includes("what"))
    )
      return "BillKaro is a free GST billing app designed for grocery shops (kiryana stores). It works directly in your browser — no installation needed! Create GST invoices, manage products, track sales, and export data. Try it at: https://gst-invoice---grocery-io0.caffeine.xyz/";

    // Kiryana / grocery / small shop / retail
    if (
      q.includes("kiryana") ||
      q.includes("grocery shop") ||
      q.includes("small shop") ||
      q.includes("retail")
    )
      return "BillKaro is built specifically for kiryana/grocery shops and small retail stores. It handles GST billing, product catalog, payment tracking, and sales reporting all in one place.";

    // General mention of BillKaro
    if (q.includes("billkaro") || q.includes("bill karo"))
      return "BillKaro is your all-in-one GST billing solution for grocery shops! It is free to use and works in any browser. Visit: https://gst-invoice---grocery-io0.caffeine.xyz/";

    // Pricing / cost / credits
    if (
      q.includes("price") ||
      q.includes("cost") ||
      q.includes("pricing") ||
      q.includes("how much") ||
      q.includes("free") ||
      q.includes("pay")
    )
      return "BillKaro is FREE to download and use! You only pay when you generate an invoice: 1 credit = 1 invoice. Credits are very affordable for small grocery shops. Buy as many or as few as you need!";

    // Credit price / cost per invoice
    if (
      q.includes("how many credit") ||
      q.includes("credit price") ||
      q.includes("cost per invoice") ||
      q.includes("1 credit")
    )
      return "1 credit = 1 invoice. Credits are purchased in packs — the more you buy, the cheaper each invoice becomes. Contact Ankit Verma on WhatsApp for current credit pricing: https://wa.me/917023285769";

    // Credits general
    if (q.includes("credit") || q.includes("buy credit"))
      return "BillKaro uses a credit system: 1 credit = 1 invoice generated. You can buy credits as needed — very affordable for small shops. The app itself is completely free to use!";

    // Features
    if (
      q.includes("feature") ||
      q.includes("what can") ||
      q.includes("capability") ||
      q.includes("function")
    )
      return "BillKaro features:\n- GST Invoices (CGST+SGST and IGST)\n- Product Catalog management\n- Store Configuration\n- Saved Invoices history\n- Export to CSV\n- Cash / Card / UPI payments\n- Invoice Credits system\n- Live Sales Dashboard";

    // Store setup / configuration
    if (
      q.includes("store") ||
      q.includes("shop setup") ||
      q.includes("configure") ||
      q.includes("setup") ||
      q.includes("configuration")
    )
      return "To set up your store in BillKaro:\nStep 1: Open the app\nStep 2: Go to Store Configuration\nStep 3: Enter your store name, address, owner name, and GSTIN\nStep 4: Save — your store is ready to create invoices!";

    // How to add a product
    if (
      q.includes("how to add product") ||
      q.includes("add item") ||
      q.includes("new product")
    )
      return "To add a product in BillKaro:\nStep 1: Open the app\nStep 2: Go to Product Catalog\nStep 3: Click Add New Product\nStep 4: Enter product name, price, and GST rate\nStep 5: Save — the product now appears in your billing list.";

    // Product limit
    if (
      q.includes("how many product") ||
      q.includes("product limit") ||
      q.includes("unlimited product")
    )
      return "BillKaro does not limit how many products you can add. You can build a complete catalog of all your grocery items with their prices and GST rates.";

    // Products general
    if (
      q.includes("product") ||
      q.includes("catalog") ||
      q.includes("add product") ||
      q.includes("item")
    )
      return "BillKaro has a full Product Catalog. You can add new products with name, price, and GST rate, edit existing products, and delete products. Your product list is saved and appears automatically when creating new bills.";

    // Dashboard
    if (
      q.includes("dashboard") ||
      q.includes("sales") ||
      q.includes("revenue") ||
      q.includes("analytics") ||
      q.includes("report")
    )
      return "BillKaro's Live Dashboard shows today's total sales, total revenue, and invoice count — all updated in real-time so you always know how your shop is performing!";

    // How to create a bill
    if (
      q.includes("how to create bill") ||
      q.includes("new bill") ||
      q.includes("make invoice") ||
      q.includes("create invoice") ||
      q.includes("create bill") ||
      q.includes("make bill")
    )
      return "How to create a bill in BillKaro:\nStep 1: Open https://gst-invoice---grocery-io0.caffeine.xyz/\nStep 2: Configure your store (store name, GSTIN, address)\nStep 3: Add your products with prices\nStep 4: Click New Bill, add customer details and products\nStep 5: Choose payment mode (Cash/Card/UPI)\nStep 6: Click Generate — 1 credit is used and invoice is ready!";

    // How to view invoice
    if (
      q.includes("how to view invoice") ||
      q.includes("check invoice") ||
      q.includes("find old bill")
    )
      return "To view saved invoices in BillKaro:\nStep 1: Open the app\nStep 2: Go to the Invoices section\nStep 3: All past bills are listed with date, customer name, and amount\nStep 4: Click any invoice to view full details or download PDF.";

    // How to export
    if (
      q.includes("how to export") ||
      q.includes("export csv") ||
      q.includes("download data")
    )
      return "To export data from BillKaro:\nStep 1: Open the Invoices section\nStep 2: Click the Export CSV button\nStep 3: A spreadsheet file will download with all your billing records. You can open it in Excel or Google Sheets.";

    // Customer
    if (
      q.includes("customer") ||
      q.includes("add customer") ||
      q.includes("buyer")
    )
      return "When creating a new bill, you can add customer details like name, phone number, and GSTIN (if the customer is a business). This information appears on the generated GST invoice.";

    // GSTIN
    if (q.includes("gstin") || q.includes("gst number") || q.includes("gst no"))
      return "GSTIN is your GST Identification Number. In BillKaro, enter your shop's GSTIN in Store Configuration. You can also enter your customer's GSTIN when creating invoices for business customers.";

    // GST rate
    if (
      q.includes("gst rate") ||
      q.includes("tax rate") ||
      q.includes("which gst")
    )
      return "When adding products in BillKaro, you assign a GST rate to each product (e.g. 0%, 5%, 12%, 18%, 28%). BillKaro then automatically calculates the correct tax on each invoice line.";

    // Payment modes
    if (
      q.includes("upi") ||
      q.includes("cash") ||
      q.includes("card") ||
      q.includes("payment mode") ||
      q.includes("payment method")
    )
      return "BillKaro supports 3 payment modes on every invoice:\n- Cash\n- Card\n- UPI\nJust select the mode when creating your bill!";

    // PDF / print
    if (
      q.includes("pdf") ||
      q.includes("print") ||
      q.includes("download invoice")
    )
      return "Every invoice generated in BillKaro can be downloaded as a PDF and printed directly. After generating a bill, use the download/print option to get a paper copy for your customer.";

    // Save / history
    if (
      q.includes("save invoice") ||
      q.includes("saved invoice") ||
      q.includes("invoice history") ||
      q.includes("past bill") ||
      q.includes("old bill")
    )
      return "BillKaro automatically saves all your invoices. Go to the Invoices section to view your full billing history, search old bills, and re-download any invoice as PDF.";

    // CSV / Export general
    if (
      q.includes("csv") ||
      q.includes("export") ||
      q.includes("download") ||
      q.includes("spreadsheet")
    )
      return "BillKaro lets you export all your invoices to CSV format with one click! Go to the Invoices screen and tap Export CSV to download a spreadsheet of all your billing data.";

    // GST types (CGST, SGST, IGST)
    if (
      q.includes("cgst") ||
      q.includes("sgst") ||
      q.includes("igst") ||
      q.includes("intra state") ||
      q.includes("inter state") ||
      q.includes("intra-state") ||
      q.includes("inter-state")
    )
      return "BillKaro supports both GST types:\n- CGST + SGST: for intra-state sales (within same state)\n- IGST: for inter-state sales (different state)\nBillKaro automatically applies the correct GST type based on your invoice!";

    // Multiple users / staff
    if (
      q.includes("multiple user") ||
      q.includes("staff") ||
      q.includes("employee") ||
      q.includes("login")
    )
      return "BillKaro works directly in the browser without a separate login system. Anyone with access to the app link can use it on their device.";

    // Internet / offline
    if (
      q.includes("internet") ||
      q.includes("offline") ||
      q.includes("without internet") ||
      q.includes("data")
    )
      return "BillKaro requires an internet connection to generate and save invoices since it is a browser-based app. Make sure you have an active connection when billing customers.";

    // Discount / offer
    if (q.includes("discount") || q.includes("offer") || q.includes("coupon"))
      return "BillKaro currently focuses on GST-compliant invoicing. You can adjust product prices manually when creating a bill to apply discounts as needed.";

    // Browser / install / mobile
    if (
      q.includes("browser") ||
      q.includes("install") ||
      q.includes("mobile") ||
      q.includes("app") ||
      q.includes("android") ||
      q.includes("ios") ||
      q.includes("phone")
    )
      return "BillKaro works directly in your browser — no app installation needed! Just open https://gst-invoice---grocery-io0.caffeine.xyz/ on any device (mobile, tablet, or computer) and start billing immediately.";

    // How to get started
    if (
      q.includes("get started") ||
      q.includes("how to start") ||
      q.includes("how to use") ||
      q.includes("begin") ||
      q.includes("start")
    )
      return "Getting started with BillKaro is easy:\nStep 1: Open https://gst-invoice---grocery-io0.caffeine.xyz/\nStep 2: Set up your store (name, GSTIN, address)\nStep 3: Add your products to the catalog\nStep 4: Create your first bill!\nNo installation needed. Works in any browser!";

    // Compare / vs / alternative
    if (
      q.includes("compare") ||
      q.includes(" vs ") ||
      q.includes("better than") ||
      q.includes("alternative")
    )
      return "BillKaro is designed specifically for small grocery shops in India. It is free to use, works in any browser without installation, and only charges per invoice generated. It supports GST (CGST/SGST/IGST), product catalog, and CSV export — all the essentials for a kiryana store.";

    // Update / new feature / coming soon
    if (
      q.includes("update") ||
      q.includes("new feature") ||
      q.includes("coming soon") ||
      q.includes("future")
    )
      return "BillKaro is actively maintained and updated. For information on upcoming features or to suggest improvements, contact Ankit Verma on WhatsApp: https://wa.me/917023285769";

    // Refund / cancel
    if (
      q.includes("refund") ||
      q.includes("cancel credit") ||
      q.includes("money back")
    )
      return "For questions about credits, refunds, or billing issues, contact Ankit Verma directly on WhatsApp: https://wa.me/917023285769";

    // Invoice / GST general
    if (q.includes("invoice") || q.includes("gst") || q.includes("bill"))
      return "BillKaro makes GST billing easy! Create professional GST invoices with CGST+SGST or IGST, add customer details and GSTIN, select products from your catalog, and choose the payment mode. Each invoice uses 1 credit.";

    // Contact / help / support
    if (
      q.includes("contact") ||
      q.includes("help") ||
      q.includes("support") ||
      q.includes("whatsapp") ||
      q.includes("ankit")
    )
      return "For help or support, contact Ankit Verma directly on WhatsApp: https://wa.me/917023285769";

    // Fallback
    return "BillKaro is a GST billing app for grocery shops. You can ask me about features, pricing, how to create bills, store setup, product catalog, CSV export, payment modes, or anything else about BillKaro. Or contact Ankit Verma directly: https://wa.me/917023285769";
  }

  // Hindi responses
  // Greetings
  if (
    q.includes("नमस्ते") ||
    q.includes("हेलो") ||
    q.includes("हैलो") ||
    q.includes("नमस्कार") ||
    q.match(/^(hi|hello|hey)/)
  )
    return "नमस्ते! मैं Shyama हूं, BillKaro की सहायक। आप मुझसे BillKaro के बारे में कुछ भी पूछ सकते हैं!";

  // Who am I
  if (
    q.includes("आप कौन") ||
    q.includes("शयामा") ||
    q.includes("Shyama") ||
    q.includes("तुम कौन")
  )
    return "मैं Shyama हूं — BillKaro की intelligent assistant। मैं आपको BillKaro के सभी सवालों का जवाब दे सकती हूं!";

  // Thanks
  if (
    q.includes("धन्यवाद") ||
    q.includes("शुक्रिया") ||
    q.includes("thank") ||
    q === "ok" ||
    q === "okay" ||
    q.includes("ठीक है") ||
    q.includes("अच्छा")
  )
    return "आपका स्वागत है! कोई और सवाल हो तो जरूर पूछें।";

  // About BillKaro
  if (
    q.includes("billkaro") ||
    q.includes("बिलकरो") ||
    q.includes("क्या है") ||
    q.includes("बिल करो")
  )
    return "BillKaro किराना दुकानों के लिए एक मुफ्त GST बिलिंग ऐप है। इसमें आप GST इनवॉइस बना सकते हैं, प्रोडक्ट मैनेज कर सकते हैं और बिक्री ट्रैक कर सकते हैं। ब्राउज़र में खोलें: https://gst-invoice---grocery-io0.caffeine.xyz/";

  // Kiryana / small shop
  if (
    q.includes("किराना") ||
    q.includes("किराने") ||
    q.includes("छोटी दुकान") ||
    q.includes("रिटेल")
  )
    return "BillKaro खास तौर पर किराना और छोटी रिटेल दुकानों के लिए बनाया गया है। इसमें GST बिलिंग, प्रोडक्ट कैटलॉग, पेमेंट ट्रैकिंग और सेल्स रिपोर्ट सब कुछ एक जगह है।";

  // Pricing
  if (
    q.includes("कीमत") ||
    q.includes("price") ||
    q.includes("कितना") ||
    q.includes("मुफ्त") ||
    q.includes("free") ||
    q.includes("पैसा") ||
    q.includes("रुपया")
  )
    return "BillKaro डाउनलोड करना बिल्कुल मुफ्त है! केवल जब आप इनवॉइस बनाते हैं तब 1 क्रेडिट लगता है। क्रेडिट बहुत सस्ते हैं — छोटी दुकानों के लिए बहुत किफायती!";

  // Credit price
  if (
    q.includes("क्रेडिट की कीमत") ||
    q.includes("1 क्रेडिट कितना") ||
    q.includes("क्रेडिट कैसे खरीदें")
  )
    return "1 क्रेडिट = 1 इनवॉइस। क्रेडिट पैक में खरीदे जाते हैं — जितना ज्यादा खरीदें, उतना सस्ता। मौजूदा कीमत के लिए अंकित वर्मा से WhatsApp पर बात करें: https://wa.me/917023285769";

  // Credits general
  if (
    q.includes("क्रेडिट") ||
    q.includes("credit") ||
    q.includes("खरीदें") ||
    q.includes("buy")
  )
    return "BillKaro का क्रेडिट सिस्टम: 1 क्रेडिट = 1 इनवॉइस। आप जितने चाहें उतने क्रेडिट खरीद सकते हैं। ऐप का उपयोग करना बिल्कुल मुफ्त है!";

  // Features
  if (
    q.includes("फीचर") ||
    q.includes("feature") ||
    q.includes("सुविधा") ||
    q.includes("क्या क्या")
  )
    return "BillKaro में शामिल हैं:\n- GST इनवॉइस (CGST+SGST और IGST)\n- प्रोडक्ट कैटलॉग\n- स्टोर कॉन्फिगरेशन\n- सेव्ड इनवॉइस\n- CSV एक्सपोर्ट\n- Cash/Card/UPI पेमेंट\n- क्रेडिट सिस्टम\n- लाइव डैशबोर्ड";

  // Store setup
  if (
    q.includes("स्टोर") ||
    q.includes("दुकान") ||
    q.includes("सेटअप") ||
    q.includes("कॉन्फिग")
  )
    return "BillKaro में स्टोर सेटअप करने के लिए:\nStep 1: ऐप खोलें\nStep 2: Store Configuration में जाएं\nStep 3: दुकान का नाम, पता, GSTIN और मालिक का नाम भरें\nStep 4: सेव करें — आपका स्टोर तैयार है!";

  // How to add product
  if (
    q.includes("प्रोडक्ट कैसे जोड़ें") ||
    q.includes("नया प्रोडक्ट") ||
    q.includes("सामान कैसे जोड़ें")
  )
    return "BillKaro में प्रोडक्ट जोड़ने का तरीका:\nStep 1: ऐप खोलें\nStep 2: Product Catalog में जाएं\nStep 3: Add New Product पर क्लिक करें\nStep 4: नाम, कीमत और GST रेट भरें\nStep 5: Save करें — प्रोडक्ट आपकी बिलिंग लिस्ट में आ जाएगा।";

  // Product limit
  if (
    q.includes("कितने प्रोडक्ट") ||
    q.includes("प्रोडक्ट लिमिट") ||
    q.includes("अनलिमिटेड")
  )
    return "BillKaro में प्रोडक्ट जोड़ने की कोई लिमिट नहीं है। आप अपनी पूरी किराने की दुकान का सामान कैटलॉग में जोड़ सकते हैं।";

  // Products general
  if (
    q.includes("प्रोडक्ट") ||
    q.includes("सामान") ||
    q.includes("product") ||
    q.includes("कैटलॉग")
  )
    return "BillKaro में प्रोडक्ट कैटलॉग है जहाँ आप नए प्रोडक्ट नाम, कीमत और GST रेट के साथ जोड़ सकते हैं, एडिट या डिलीट कर सकते हैं। बिल बनाते वक्त ये प्रोडक्ट अपने आप दिखते हैं।";

  // Dashboard
  if (
    q.includes("डैशबोर्ड") ||
    q.includes("बिक्री") ||
    q.includes("कमाई") ||
    q.includes("dashboard") ||
    q.includes("रिपोर्ट")
  )
    return "BillKaro का Live Dashboard दिखाता है: आज की कुल बिक्री, कुल कमाई, और इनवॉइस की संख्या — सब कुछ real-time में अपडेट होता है!";

  // How to create a bill
  if (
    q.includes("नया बिल") ||
    q.includes("बिल बनाएं") ||
    q.includes("इनवॉइस कैसे") ||
    q.includes("बिल कैसे") ||
    q.includes("नया इनवॉइस")
  )
    return "BillKaro में बिल बनाने का तरीका:\nStep 1: https://gst-invoice---grocery-io0.caffeine.xyz/ खोलें\nStep 2: स्टोर कॉन्फिग करें (नाम, GSTIN, पता)\nStep 3: प्रोडक्ट जोड़ें\nStep 4: New Bill पर क्लिक करें, कस्टमर जानकारी और प्रोडक्ट जोड़ें\nStep 5: पेमेंट मोड चुनें (Cash/Card/UPI)\nStep 6: Generate करें — 1 क्रेडिट लगेगा और इनवॉइस तैयार!";

  // How to view invoice
  if (
    q.includes("इनवॉइस कैसे देखें") ||
    q.includes("बिल कैसे देखें") ||
    q.includes("पुराना इनवॉइस")
  )
    return "BillKaro में पुराने इनवॉइस देखने का तरीका:\nStep 1: ऐप खोलें\nStep 2: Invoices सेक्शन में जाएं\nStep 3: सभी बिल तारीख, कस्टमर नाम और अमाउंट के साथ दिखेंगे\nStep 4: किसी भी इनवॉइस पर क्लिक करके PDF डाउनलोड करें।";

  // Invoice history / saved
  if (
    q.includes("पुराना बिल") ||
    q.includes("बिल हिस्ट्री") ||
    q.includes("सेव्ड इनवॉइस") ||
    q.includes("पिछला बिल")
  )
    return "BillKaro में सभी इनवॉइस अपने आप सेव होते हैं। Invoices सेक्शन में जाएं, वहां सारे पुराने बिल मिलेंगे जिन्हें आप देख और डाउनलोड कर सकते हैं।";

  // Payment
  if (
    q.includes("भुगतान") ||
    q.includes("पेमेंट") ||
    q.includes("upi") ||
    q.includes("नकद") ||
    q.includes("कार्ड") ||
    q.includes("payment")
  )
    return "BillKaro में हर इनवॉइस पर 3 पेमेंट मोड:\n- Cash (नकद)\n- Card\n- UPI\nबिल बनाते समय आप चुन सकते हैं!";

  // PDF / print
  if (q.includes("pdf") || q.includes("प्रिंट") || q.includes("प्रिंट कैसे"))
    return "BillKaro में हर इनवॉइस को PDF में डाउनलोड या प्रिंट किया जा सकता है। बिल जनरेट करने के बाद डाउनलोड/प्रिंट का ऑप्शन दिखता है।";

  // GSTIN
  if (
    q.includes("gstin") ||
    q.includes("जीएसटी नंबर") ||
    q.includes("gst number") ||
    q.includes("gst no")
  )
    return "GSTIN आपका GST पहचान नंबर है। BillKaro में Store Configuration में अपनी दुकान का GSTIN डालें। बिजनेस कस्टमर के लिए इनवॉइस बनाते वक्त उनका GSTIN भी डाल सकते हैं।";

  // GST rate
  if (q.includes("gst रेट") || q.includes("टैक्स रेट") || q.includes("कौन सा gst"))
    return "प्रोडक्ट जोड़ते समय आप हर सामान पर GST रेट डालते हैं (जैसे 0%, 5%, 12%, 18%, 28%)। BillKaro अपने आप सही टैक्स कैलकुलेट करता है।";

  // CSV / Export
  if (
    q.includes("csv") ||
    q.includes("एक्सपोर्ट") ||
    q.includes("export") ||
    q.includes("डाउनलोड") ||
    q.includes("download")
  )
    return "BillKaro में आप सभी इनवॉइस को CSV फॉर्मेट में एक्सपोर्ट कर सकते हैं। Invoices स्क्रीन पर जाएं और Export CSV पर टैप करें। Excel या Google Sheets में खोल सकते हैं।";

  // GST types
  if (
    q.includes("cgst") ||
    q.includes("sgst") ||
    q.includes("igst") ||
    q.includes("अंतर राज्य") ||
    q.includes("राज्य के अंदर")
  )
    return "BillKaro दोनों GST प्रकार सपोर्ट करता है:\n- CGST + SGST: राज्य के अंदर बिक्री के लिए\n- IGST: दूसरे राज्य में बिक्री के लिए\nBillKaro अपने आप सही GST लगाता है!";

  // Internet / offline
  if (
    q.includes("इंटरनेट") ||
    q.includes("ऑफलाइन") ||
    q.includes("बिना इंटरनेट") ||
    q.includes("नेट")
  )
    return "BillKaro एक ब्राउज़र-based ऐप है, इसलिए इनवॉइस बनाने और सेव करने के लिए इंटरनेट कनेक्शन जरूरी है।";

  // Discount
  if (q.includes("डिस्काउंट") || q.includes("छूट") || q.includes("ऑफर"))
    return "BillKaro में बिल बनाते वक्त आप प्रोडक्ट की कीमत मैन्युअली बदल सकते हैं जिससे डिस्काउंट दे सकते हैं।";

  // Browser / install / mobile
  if (
    q.includes("ब्राउज़र") ||
    q.includes("browser") ||
    q.includes("इंस्टॉल") ||
    q.includes("install") ||
    q.includes("मोबाइल") ||
    q.includes("mobile") ||
    q.includes("ऐप")
  )
    return "BillKaro सीधे ब्राउज़र में चलता है — कोई इंस्टॉलेशन नहीं! बस https://gst-invoice---grocery-io0.caffeine.xyz/ खोलें किसी भी डिवाइस पर (मोबाइल, टैबलेट, कंप्यूटर)।";

  // Getting started
  if (
    q.includes("कैसे शुरू") ||
    q.includes("शुरू कैसे") ||
    q.includes("शुरुआत") ||
    q.includes("कैसे करें") ||
    q.includes("कैसे")
  )
    return "BillKaro शुरू करना आसान है:\nStep 1: https://gst-invoice---grocery-io0.caffeine.xyz/ खोलें\nStep 2: स्टोर सेटअप करें (नाम, GSTIN, पता)\nStep 3: प्रोडक्ट कैटलॉग में सामान जोड़ें\nStep 4: पहला बिल बनाएं!\nकोई इंस्टॉलेशन नहीं, किसी भी ब्राउज़र में काम करता है!";

  // Compare / alternative
  if (q.includes("तुलना") || q.includes("बेहतर") || q.includes("दूसरा ऐप"))
    return "BillKaro भारत की छोटी किराना दुकानों के लिए बना है। यह मुफ्त है, ब्राउज़र में चलता है, GST (CGST/SGST/IGST), प्रोडक्ट कैटलॉग और CSV एक्सपोर्ट — सब कुछ एक जगह।";

  // Refund
  if (q.includes("रिफंड") || q.includes("वापसी") || q.includes("पैसे वापस"))
    return "क्रेडिट या रिफंड से जुड़े किसी भी सवाल के लिए अंकित वर्मा से WhatsApp पर संपर्क करें: https://wa.me/917023285769";

  // Invoice / GST / bill general
  if (
    q.includes("invoice") ||
    q.includes("इनवॉइस") ||
    q.includes("gst") ||
    q.includes("बिल")
  )
    return "BillKaro में GST बिलिंग बहुत आसान है! CGST+SGST या IGST के साथ professional इनवॉइस बनाएं। हर इनवॉइस में 1 क्रेडिट लगता है।";

  // Contact
  if (
    q.includes("संपर्क") ||
    q.includes("contact") ||
    q.includes("मदद") ||
    q.includes("help") ||
    q.includes("whatsapp") ||
    q.includes("अंकित")
  )
    return "अंकित वर्मा से WhatsApp पर बात करें: https://wa.me/917023285769";

  // Fallback
  return "BillKaro किराना दुकानों के लिए GST बिलिंग ऐप है। आप मुझसे फीचर, कीमत, बिल बनाने का तरीका, स्टोर सेटअप, प्रोडक्ट कैटलॉग, CSV एक्सपोर्ट के बारे में पूछ सकते हैं। या अंकित वर्मा से बात करें: https://wa.me/917023285769";
}

function getVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
      return;
    }
    window.speechSynthesis.onvoiceschanged = () => {
      resolve(window.speechSynthesis.getVoices());
    };
    // Fallback timeout in case event never fires
    setTimeout(() => resolve(window.speechSynthesis.getVoices()), 1000);
  });
}

const FEMALE_VOICE_NAMES = [
  "Google UK English Female",
  "Google US English",
  "Microsoft Zira",
  "Samantha",
  "Victoria",
  "Karen",
  "Moira",
  "Tessa",
  "Fiona",
  "Veena",
  "Rishi",
];

function renderMessage(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part) =>
    urlRegex.test(part) ? (
      <a
        key={`url-${part}`}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-blue-200 hover:text-blue-100"
      >
        {part}
      </a>
    ) : (
      <span key={`txt-${part}`}>{part}</span>
    ),
  );
}

export default function ShyamaAI({
  lang,
  onLangChange,
  isOpen,
  onToggle,
}: ShyamaAIProps) {
  const [chatLang, setChatLang] = useState<Lang>(lang);
  const [langChosen, setLangChosen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const msgCountRef = useRef(0);

  const tr = t[chatLang];

  useEffect(() => {
    setChatLang(lang);
  }, [lang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }); // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on message change

  const chooseLang = (l: Lang) => {
    setChatLang(l);
    onLangChange(l);
    setLangChosen(true);
    msgCountRef.current += 1;
    setMessages([
      {
        role: "bot",
        text: t[l].chat_welcome,
        id: `msg-${msgCountRef.current}`,
      },
    ]);
  };

  const sendMessage = (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg) return;
    const response = getBotResponse(msg, chatLang);
    msgCountRef.current += 2;
    const uid = msgCountRef.current - 1;
    const bid = msgCountRef.current;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: msg, id: `msg-${uid}` },
      { role: "bot", text: response, id: `msg-${bid}` },
    ]);
    setInput("");
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(
        response.replace(/https?:\/\/[^\s]+/g, ""),
      );
      utt.lang = chatLang === "hi" ? "hi-IN" : "en-IN";
      if (chatLang === "en") {
        utt.pitch = 1.1;
        getVoices().then((voices) => {
          const femaleVoice =
            voices.find(
              (v) =>
                v.name.toLowerCase().includes("female") ||
                (v as any).gender === "female" ||
                FEMALE_VOICE_NAMES.some((name) => v.name.includes(name)),
            ) ||
            voices.find(
              (v) =>
                v.lang.startsWith("en") &&
                v.name.toLowerCase().includes("female"),
            ) ||
            voices.find((v) => v.lang.startsWith("en"));
          if (femaleVoice) {
            utt.voice = femaleVoice;
          }
          window.speechSynthesis.speak(utt);
        });
      } else {
        window.speechSynthesis.speak(utt);
      }
    }
  };

  const toggleMic = () => {
    const w = window as any;
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) return;
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const recognition = new SR();
    recognition.lang = chatLang === "hi" ? "hi-IN" : "en-IN";
    recognition.interimResults = false;
    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      sendMessage(transcript);
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full gradient-btn shadow-float flex items-center justify-center hover:scale-110 transition-transform duration-200"
        data-ocid="chatbot.open_modal_button"
        title="Chat with Shyama"
      >
        {isOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white" />
        )}
        {!isOpen && (
          <span className="absolute w-full h-full rounded-full gradient-btn animate-pulse-ring" />
        )}
      </button>

      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-3xl shadow-float overflow-hidden border border-gray-100"
          data-ocid="chatbot.dialog"
        >
          <div className="gradient-hero px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">Shyama</div>
                <div className="text-white/70 text-xs">BillKaro Assistant</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-white/20 rounded-pill overflow-hidden">
                <button
                  type="button"
                  onClick={() => chooseLang("hi")}
                  className={`px-2 py-1 text-xs font-bold transition-colors ${
                    chatLang === "hi" ? "bg-white text-[#E2367A]" : "text-white"
                  }`}
                  data-ocid="chatbot.hindi.toggle"
                >
                  HI
                </button>
                <button
                  type="button"
                  onClick={() => chooseLang("en")}
                  className={`px-2 py-1 text-xs font-bold transition-colors ${
                    chatLang === "en" ? "bg-white text-[#E2367A]" : "text-white"
                  }`}
                  data-ocid="chatbot.english.toggle"
                >
                  EN
                </button>
              </div>
              <button
                type="button"
                onClick={onToggle}
                className="text-white/80 hover:text-white"
                data-ocid="chatbot.close_button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {!langChosen ? (
            <div className="p-6 flex flex-col items-center gap-4">
              <Globe className="w-10 h-10 text-[#6A2BD9]" />
              <p className="font-semibold text-gray-700 text-center">
                {tr.chat_lang_choose} / Choose your language
              </p>
              <div className="flex gap-3 w-full">
                <button
                  type="button"
                  onClick={() => chooseLang("hi")}
                  className="flex-1 gradient-btn text-white font-bold py-3 rounded-pill hover:opacity-90 transition-opacity"
                  data-ocid="chatbot.hindi.button"
                >
                  हिंदी
                </button>
                <button
                  type="button"
                  onClick={() => chooseLang("en")}
                  className="flex-1 border-2 border-[#6A2BD9] text-[#6A2BD9] font-bold py-3 rounded-pill hover:bg-[#6A2BD9] hover:text-white transition-colors"
                  data-ocid="chatbot.english.button"
                >
                  English
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="chat-messages h-64 overflow-y-auto p-4 flex flex-col gap-3 bg-gray-50">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "gradient-btn text-white rounded-br-sm"
                          : "bg-white text-gray-700 shadow-sm rounded-bl-sm border border-gray-100"
                      }`}
                    >
                      {msg.role === "bot" ? renderMessage(msg.text) : msg.text}
                    </div>
                  </div>
                ))}
                {listening && (
                  <div className="flex justify-start">
                    <div className="bg-white px-4 py-2.5 rounded-2xl text-sm text-[#E2367A] font-medium shadow-sm border border-gray-100 animate-pulse">
                      {tr.chat_listening}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-3 border-t border-gray-100 flex items-center gap-2 bg-white">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder={tr.chat_placeholder}
                  className="flex-1 text-sm border border-gray-200 rounded-pill px-4 py-2 focus:outline-none focus:border-[#6A2BD9] bg-gray-50"
                  data-ocid="chatbot.input"
                />
                <button
                  type="button"
                  onClick={toggleMic}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                    listening
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                  data-ocid="chatbot.mic.button"
                >
                  {listening ? (
                    <MicOff className="w-4 h-4" />
                  ) : (
                    <Mic className="w-4 h-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => sendMessage()}
                  className="w-9 h-9 rounded-full gradient-btn flex items-center justify-center hover:opacity-90 transition-opacity"
                  data-ocid="chatbot.submit_button"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
