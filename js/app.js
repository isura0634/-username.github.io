// اللغة الافتراضية
let lang = localStorage.getItem('site_lang') || 'ar';

// ترجمات بسيطة
const translations = {
  ar: {
    title: "Auto Parts Pro — متجر قطع غيار",
    nav_products:"المنتجات",
    nav_about:"من نحن",
    nav_contact:"تواصل معنا",
    cart:"السلة",
    hero_title:"أفضل قطع غيار لسيارتك بأفضل الأسعار",
    hero_sub:"تصفّح مجموعتنا الواسعة من قطع الغيار الأصلية والبديلة، واطلبها بسرعة وسهولة.",
    browse:"تصفح المنتجات",
    contact:"تواصل معنا",
    our_products:"منتجاتنا",
    search_placeholder:"ابحث عن منتج...",
    all_categories:"كل التصنيفات",
    cat_engine:"محرك",
    cat_brake:"فرامل",
    cat_suspension:"نظام تعليق",
    cat_electrical:"كهرباء",
    about_title:"من نحن",
    about_text:"نقدم قطع غيار عالية الجودة وخدمة سريعة. هدفنا إرضاء العميل من خلال منت��ات أصلية وبدائل موثوقة.",
    contact_title:"تواصل معنا",
    name_label:"الاسم",
    email_label:"البريد الإلكتروني",
    message_label:"الرسالة",
    send:"إرسال",
    total:"المجموع:",
    checkout:"الدفع",
    qty_label:"الكمية",
    add_to_cart:"أضف للسلة",
    rights:"جميع الحقوق محفوظة",
    chat_title:"الدردشة مع الدعم",
    chat_sub:"ردود فورية بالعربية والإنجليزية",
    chat_placeholder:"اكتب سؤالك هنا..."
  },
  en: {
    title: "Auto Parts Pro — Auto Parts Store",
    nav_products:"Products",
    nav_about:"About",
    nav_contact:"Contact",
    cart:"Cart",
    hero_title:"Best auto parts for your car at great prices",
    hero_sub:"Browse our wide selection of original and aftermarket parts, order quickly and easily.",
    browse:"Browse products",
    contact:"Contact us",
    our_products:"Our products",
    search_placeholder:"Search for a product...",
    all_categories:"All categories",
    cat_engine:"Engine",
    cat_brake:"Brake",
    cat_suspension:"Suspension",
    cat_electrical:"Electrical",
    about_title:"About Us",
    about_text:"We provide high-quality parts and fast service. Our goal is customer satisfaction with original and trusted replacement parts.",
    contact_title:"Contact Us",
    name_label:"Name",
    email_label:"Email",
    message_label:"Message",
    send:"Send",
    total:"Total:",
    checkout:"Checkout",
    qty_label:"Qty",
    add_to_cart:"Add to cart",
    rights:"All rights reserved",
    chat_title:"Chat with Support",
    chat_sub:"Instant replies in Arabic and English",
    chat_placeholder:"Type your question..."
  }
};

// بيانات منتجات مع ترجمة العنوان والوصف
const products = [
  { id:1, translations:{ar:{title:'فلتر هواء أصلي', desc:'فلتر هواء عالي الجودة متوافق مع عدة موديلات.'}, en:{title:'Original Air Filter', desc:'High quality air filter compatible with multiple models.'}}, category:'engine', price:120.00, img:'https://images.unsplash.com/photo-1587652971156-3a2d1b1f3c79?q=80&w=900&auto=format&fit=crop' },
  { id:2, translations:{ar:{title:'طقم تيل فرامل أمامي', desc:'أداء ممتاز وثبات على الطريق.'}, en:{title:'Front Brake Pads Set', desc:'Excellent performance and road grip.'}}, category:'brake', price:350.00, img:'https://images.unsplash.com/photo-1602196751670-7f6b9e9e6a2a?q=80&w=900&auto=format&fit=crop' },
  { id:3, translations:{ar:{title:'مساعد تعليق خلفي', desc:'متانة وطول عمر للخدمة.'}, en:{title:'Rear Shock Absorber', desc:'Durable and long lasting.'}}, category:'suspension', price:790.00, img:'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=900&auto=format&fit=crop' },
  { id:4, translations:{ar:{title:'محرّك كهربائي صغير', desc:'مكونات كهربائية عالية الجودة.'}, en:{title:'Small Electric Motor', desc:'High-quality electrical components.'}}, category:'electrical', price:480.00, img:'https://images.unsplash.com/photo-1611111344651-5a90d7b06e2d?q=80&w=900&auto=format&fit=crop' },
  { id:5, translations:{ar:{title:'طقم سير محرك', desc:'طقم سير كامل مع بكرة.'}, en:{title:'Engine Timing Belt Kit', desc:'Complete kit with pulley.'}}, category:'engine', price:220.00, img:'https://images.unsplash.com/photo-1563720223811-0a0c6ef7fab7?q=80&w=900&auto=format&fit=crop' }
];

const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

const cartPanel = document.getElementById('cartPanel');
const cartToggle = document.getElementById('cartToggle');
const closeCart = document.getElementById('closeCart');
const cartItemsEl = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

const productModal = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalPrice = document.getElementById('modalPrice');
const modalCategory = document.getElementById('modalCategory');
const modalQty = document.getElementById('modalQty');
const addToCartBtn = document.getElementById('addToCartBtn');

const langSelect = document.getElementById('langSelect');

const chatToggle = document.getElementById('chatToggle');
const chatPanel = document.getElementById('chatPanel');
const closeChat = document.getElementById('closeChat');
const chatForm = document.getElementById('chatForm');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const botMode = document.getElementById('botMode');

let cart = JSON.parse(localStorage.getItem('cart') || '{}');

// تهيئة الواجهة
applyLangToUI();
renderProducts(products);
renderCart();

// --- ترجمة واجهة المستخدم ---
function applyLangToUI(){
  // set global lang and direction
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
  // نصوص بعلامة data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if(translations[lang] && translations[lang][key]) el.textContent = translations[lang][key];
  });
  // placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if(translations[lang] && translations[lang][key]) el.placeholder = translations[lang][key];
  });
  // set langSelect value
  langSelect.value = lang;
  // update chat input placeholder
  if(chatInput) {
    chatInput.placeholder = translations[lang]?.chat_placeholder || '';
  }
  localStorage.setItem('site_lang', lang);
}

// تغيير اللغة
langSelect.addEventListener('change', (e) => {
  lang = e.target.value;
  applyLangToUI();
  renderProducts(products);
});

// --- عرض المنتجات مع دعم الترجمة ---
function renderProducts(list){
  productsGrid.innerHTML = '';
  list.forEach(p => {
    const title = p.translations[lang]?.title || p.translations['en'].title;
    const desc = p.translations[lang]?.desc || p.translations['en'].desc;
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.img}" alt="${escapeHtml(title)}">
      <h4>${escapeHtml(title)}</h4>
      <div class="muted">${categoryName(p.category)}</div>
      <div class="card-bottom">
        <div class="price">${p.price.toFixed(2)} ر.س</div>
        <div>
          <button class="btn" data-id="${p.id}" onclick="openModal(${p.id})">${lang==='ar'? 'عرض' : 'View'}</button>
          <button class="btn primary" onclick="addToCart(${p.id},1)">${lang==='ar'? 'أضف' : 'Add'}</button>
        </div>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}

// البحث / الفلترة
searchInput.addEventListener('input', () => applyFilters());
categoryFilter.addEventListener('change', () => applyFilters());

function applyFilters(){
  const q = (searchInput.value || '').trim().toLowerCase();
  const cat = categoryFilter.value;
  const filtered = products.filter(p => {
    const title = (p.translations[lang]?.title || p.translations['en'].title).toLowerCase();
    const desc = (p.translations[lang]?.desc || p.translations['en'].desc).toLowerCase();
    const matchesQ = !q || title.includes(q) || desc.includes(q);
    const matchesCat = cat === 'all' || p.category === cat;
    return matchesQ && matchesCat;
  });
  renderProducts(filtered);
}

// نافذة المنتج
function openModal(id){
  const p = products.find(x => x.id === id);
  if(!p) return;
  const title = p.translations[lang]?.title || p.translations['en'].title;
  const desc = p.translations[lang]?.desc || p.translations['en'].desc;
  modalImage.src = p.img;
  modalTitle.textContent = title;
  modalDesc.textContent = desc;
  modalPrice.textContent = p.price.toFixed(2);
  modalCategory.textContent = categoryName(p.category);
  modalQty.value = 1;
  addToCartBtn.onclick = () => { addToCart(p.id, Number(modalQty.value)); closeProductModal(); }
  productModal.classList.add('show');
  productModal.setAttribute('aria-hidden','false');
}
function closeProductModal(){
  productModal.classList.remove('show');
  productModal.setAttribute('aria-hidden','true');
}
closeModal.addEventListener('click', closeProductModal);
productModal.addEventListener('click', (e)=> { if(e.target===productModal) closeProductModal() });

// سلة التسوق (مبسطة)
function addToCart(id, qty=1){
  const key = String(id);
  if(cart[key]) cart[key].qty += qty;
  else {
    const p = products.find(x=>x.id===id);
    cart[key] = { id:p.id, title:p.translations[lang]?.title || p.translations['en'].title, price:p.price, qty:qty, img:p.img };
  }
  saveCart();
  renderCart();
}

// إزالة/تعديل
function removeFromCart(id){
  delete cart[String(id)];
  saveCart(); renderCart();
}
function updateQty(id, qty){
  qty = Number(qty);
  if(qty<=0) removeFromCart(id);
  else { cart[String(id)].qty = qty; saveCart(); renderCart(); }
}

function renderCart(){
  const items = Object.values(cart);
  cartItemsEl.innerHTML = '';
  if(items.length===0){
    cartItemsEl.innerHTML = '<p class="muted">' + (lang==='ar' ? 'السلة فارغة' : 'Cart is empty') + '</p>';
  } else {
    items.forEach(it => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${it.img}" alt="${escapeHtml(it.title)}">
        <div style="flex:1">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <strong>${escapeHtml(it.title)}</strong>
            <button class="close-btn" onclick="removeFromCart(${it.id})">×</button>
          </div>
          <div class="muted" style="display:flex;justify-content:space-between;align-items:center;margin-top:6px">
            <div>
              <input type="number" min="1" value="${it.qty}" style="width:70px;padding:4px;border-radius:6px;border:1px solid #e6eefc" onchange="updateQty(${it.id}, this.value)">
            </div>
            <div>${(it.price * it.qty).toFixed(2)} ر.س</div>
          </div>
        </div>
      `;
      cartItemsEl.appendChild(div);
    });
  }
  const total = items.reduce((s,i)=> s + i.price * i.qty, 0);
  cartTotal.textContent = total.toFixed(2) + ' ر.س';
  cartCount.textContent = items.reduce((s,i)=> s + i.qty,0);
}

// حفظ في localStorage
function saveCart(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

// فتح/إغلاق لوحة السلة
cartToggle.addEventListener('click', ()=> {
  cartPanel.classList.add('open');
  cartPanel.setAttribute('aria-hidden','false');
});
closeCart.addEventListener('click', ()=> {
  cartPanel.classList.remove('open');
  cartPanel.setAttribute('aria-hidden','true');
});

// عند الدفع (اختبار)
checkoutBtn.addEventListener('click', ()=> {
  alert(lang==='ar' ? 'بدء عملية الدفع (هذه نسخة تجريبية).' : 'Start checkout (demo).');
  // هنا يمكنك ربط نظام دفع أو إرسال الطلب إلى الخادم
});

// مساعدة: تحويل اسم التصنيف للعرض
function categoryName(key){
  const map_ar = {
    engine:'محرك',
    brake:'فرامل',
    suspension:'نظام تعليق',
    electrical:'كهرباء'
  };
  const map_en = {
    engine:'Engine',
    brake:'Brake',
    suspension:'Suspension',
    electrical:'Electrical'
  };
  return (lang==='ar' ? map_ar[key] : map_en[key]) || key;
}

// دالة بسيطة للهروب من HTML
function escapeHtml(s){ return String(s).replace(/[&<>"'`=\/]/g, function (c) { return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;','`':'&#x60;','=':'&#x3D;' }[c]; }); }

// فتح المنتج عند الضغط على زر من عناصر الديناميكية (global)
window.openModal = openModal;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQty = updateQty;

/* =========================
   Chatbot (UI + Local bot + API mode)
   ========================= */
chatToggle.addEventListener('click', ()=> openChat());
closeChat.addEventListener('click', ()=> closeChatPanel());

function openChat(){
  chatPanel.classList.add('open');
  chatPanel.setAttribute('aria-hidden','false');
  // مرحب أولي
  if(chatMessages.children.length === 0) {
    pushBotMessage( lang==='ar' ? 'مرحباً! كيف أستطيع مساعدتك اليوم؟' : 'Hello! How can I help you today?' );
  }
  chatInput.focus();
}
function closeChatPanel(){
  chatPanel.classList.remove('open');
  chatPanel.setAttribute('aria-hidden','true');
}

function pushUserMessage(text){
  const div = document.createElement('div');
  div.className = 'msg user';
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
function pushBotMessage(text){
  const div = document.createElement('div');
  div.className = 'msg bot';
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// نموذج الدردشة
chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if(!text) return;
  pushUserMessage(text);
  chatInput.value = '';
  const mode = botMode.value; // 'local' or 'api'
  if(mode === 'local') {
    const resp = localBotReply(text);
    // محاكاة تأخير
    setTimeout(()=> pushBotMessage(resp), 400);
  } else {
    pushBotMessage( lang==='ar' ? 'يتم ارسال رسالتك...' : 'Sending your message...' );
    try {
      const reply = await sendToServerChat(text, lang);
      // حذف الرسالة المؤقتة (آخر رسالة بوت هي المؤقتة)
      const bots = chatMessages.querySelectorAll('.msg.bot');
      if(bots.length) bots[bots.length-1].remove();
      pushBotMessage(reply);
    } catch(err){
      // خطأ
      const bots = chatMessages.querySelectorAll('.msg.bot');
      if(bots.length) bots[bots.length-1].remove();
      pushBotMessage(lang==='ar' ? 'حدث خطأ أثناء الاتصال بالخادم.' : 'Error contacting server.');
      console.error(err);
    }
  }
});

// ردود محلّية بسيطة (قواعدية)
function localBotReply(text){
  const t = text.toLowerCase();
  // كلمات مفتاحية عربي وإنجليزي
  if(/(سعر|كم|price)/i.test(t)) return lang==='ar' ? 'أسعارنا مُدرجة على صفحة المنتج. هل تريد أن أبحث عن منتج معين؟' : 'Prices are shown on product pages. Do you want me to search for a product?';
  if(/(الشحن|توصيل|shipping|delivery)/i.test(t)) return lang==='ar' ? 'نقدّم خيارات شحن متعددة. الرجاء إرسال مدينتك للحصول على تقدير.' : 'We offer multiple shipping options. Please send your city for an estimate.';
  if(/(وقت|وقت تسليم|delivery time|when)/i.test(t)) return lang==='ar' ? 'وقت التوصيل يعتمد على المنتج والموقع، عادة 2-7 أيام.' : 'Delivery time depends on product and location, usually 2-7 days.';
  if(/(مرحب|السلام|hello|hi)/i.test(t)) return lang==='ar' ? 'أهلاً! كيف أساعدك؟' : 'Hi! How can I assist?';
  if(/(تشك|شكرا|thanks)/i.test(t)) return lang==='ar' ? 'على الرحب والسعة!' : 'You\'re welcome!';
  // البحث عن منتجات
  const found = products.filter(p => {
    const title = (p.translations[lang]?.title || p.translations['en'].title).toLowerCase();
    return title.includes(t);
  });
  if(found.length) {
    const names = found.slice(0,3).map(f => f.translations[lang]?.title || f.translations['en'].title).join(', ');
    return lang==='ar' ? `وجدت هذه المنتجات: ${names}` : `Found these products: ${names}`;
  }
  return lang==='ar' ? 'عذراً لم أفهم. حاول أن تسأل بطريقة مختلفة أو استخدم وضع AI للرد الذكي.' : 'Sorry, I did not understand. Try asking differently or switch to AI mode for smarter replies.';
}

// إرسال إلى السيرفر (ي��وقع endpoint /api/chat) — تحتاج إعداد سيرفر
async function sendToServerChat(message, language='en'){
  // تأكد من أن السيرفر يعمل ويستقبل POST /api/chat {message, lang}
  const res = await fetch('/api/chat', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({message, lang: language})
  });
  if(!res.ok) throw new Error('Network response was not ok');
  const data = await res.json();
  // يتوقع حقل {reply: "..."}
  return data.reply || (language==='ar' ? 'لم يتم تلقي رد' : 'No reply received');
}

/* =========================
   Utilities
   ========================= */
document.getElementById('year').textContent = new Date().getFullYear();
