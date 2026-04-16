import { useState, useEffect, useMemo, useCallback } from "react";
import {
  ConfigProvider, Layout, Menu, Badge, Button, Card, Row, Col, Select,
  Slider, Tag, Rate, InputNumber, Steps, Form, Input, Radio, Modal,
  Divider, Empty, Drawer, Typography, Space, Tooltip, notification,
  Progress, Spin, Result, Breadcrumb, Image, Statistic, Alert
} from "antd";
import {
  ShoppingCartOutlined, HeartOutlined, HeartFilled, SearchOutlined,
  FilterOutlined, StarFilled, TruckOutlined, SafetyOutlined,
  GiftOutlined, ArrowRightOutlined, DeleteOutlined, PlusOutlined,
  MinusOutlined, CheckCircleFilled, CreditCardOutlined,
  BankOutlined, MobileOutlined, LockOutlined, UserOutlined,
  EnvironmentOutlined, PhoneOutlined, MailOutlined, CloseOutlined,
  FireOutlined,  ThunderboltOutlined, HomeOutlined,
  AppstoreOutlined, InfoCircleOutlined, RocketOutlined
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Step } = Steps;

// ─── Theme ───────────────────────────────────────────────────────────────────
const THEME = {
  token: {
    colorPrimary: "#2D6A4F",
    colorPrimaryHover: "#1B4332",
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    borderRadius: 12,
    fontFamily: "'Nunito', 'Segoe UI', sans-serif",
  },
};

const C = {
  green:       "#2D6A4F",
  greenDark:   "#1B4332",
  greenLight:  "#D8F3DC",
  greenMid:    "#74C69D",
  cream:       "#FEFAE0",
  creamDark:   "#F5EFD6",
  amber:       "#E9C46A",
  amberDark:   "#F4A261",
  orange:      "#E76F51",
  brown:       "#6B3A2A",
  white:       "#FFFFFF",
  gray50:      "#F9FAFB",
  gray100:     "#F3F4F6",
  gray300:     "#D1D5DB",
  gray500:     "#6B7280",
  gray700:     "#374151",
  gray900:     "#111827",
};

// ─── Data ────────────────────────────────────────────────────────────────────
const FLAVORS = ["All", "Classic Salted", "Peri Peri", "Dark Chocolate", "Himalayan Pink Salt", "Turmeric & Pepper", "Caramel", "Cheesy Herb", "Masala"];

const PRODUCTS = [
  {
    id: 1, name: "Classic Salted Makhana", flavor: "Classic Salted",
    price: 249, originalPrice: 299, weight: "100g",
    rating: 4.8, reviews: 1240, badge: "Best Seller",
    badgeColor: C.green,
    description: "Our signature lightly salted fox nuts, slow-roasted to golden perfection. Crispy, airy, and irresistibly snackable. Zero artificial preservatives, maximum crunch.",
    highlights: ["High Protein", "Low Calorie", "Gluten Free", "Non-GMO"],
    emoji: "🧂", gradient: `linear-gradient(135deg, #D8F3DC, #B7E4C7)`,
    image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&q=80",
    stock: 50, calories: 55, protein: "4g",
  },
  {
    id: 2, name: "Fiery Peri Peri Makhana", flavor: "Peri Peri",
    price: 279, originalPrice: 329, weight: "100g",
    rating: 4.7, reviews: 890, badge: "🔥 Hot",
    badgeColor: C.orange,
    description: "Bold African bird's eye chili seasoning meets the delicate crunch of fox nuts. A flavor explosion that keeps you reaching for more.",
    highlights: ["Spicy Kick", "Vegan", "No MSG", "Rich in Magnesium"],
    emoji: "🌶️", gradient: `linear-gradient(135deg, #FFE8D6, #FFC9A0)`,
    image: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=400&q=80",
    stock: 35, calories: 60, protein: "4g",
  },
  {
    id: 3, name: "Dark Chocolate Makhana", flavor: "Dark Chocolate",
    price: 319, originalPrice: 379, weight: "100g",
    rating: 4.9, reviews: 2100, badge: "⭐ Top Rated",
    badgeColor: "#5C3317",
    description: "Premium 70% dark Belgian chocolate coating on air-popped makhana. The guilt-free indulgence you've been dreaming of.",
    highlights: ["Antioxidant Rich", "Keto Friendly", "Premium Belgian Cocoa", "Low Sugar"],
    emoji: "🍫", gradient: `linear-gradient(135deg, #F5E6D3, #D4A574)`,
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&q=80",
    stock: 28, calories: 85, protein: "3.5g",
  },
  {
    id: 4, name: "Himalayan Pink Salt Makhana", flavor: "Himalayan Pink Salt",
    price: 269, originalPrice: 319, weight: "100g",
    rating: 4.6, reviews: 756, badge: "Natural",
    badgeColor: "#E91E8C",
    description: "Sourced from ancient Himalayan salt mines, this mineral-rich seasoning elevates our fox nuts to gourmet territory.",
    highlights: ["84+ Minerals", "Alkaline", "Gut Friendly", "Clean Label"],
    emoji: "🏔️", gradient: `linear-gradient(135deg, #FFE4E8, #FFB3C6)`,
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&q=80",
    stock: 42, calories: 56, protein: "4.1g",
  },
  {
    id: 5, name: "Golden Turmeric & Pepper", flavor: "Turmeric & Pepper",
    price: 289, originalPrice: 339, weight: "100g",
    rating: 4.5, reviews: 612, badge: "Immunity+",
    badgeColor: "#F59E0B",
    description: "Ancient Ayurvedic wisdom in every bite. Curcumin-rich turmeric with black pepper for maximum bioavailability.",
    highlights: ["Anti-Inflammatory", "Immunity Boost", "Ayurvedic", "No Additives"],
    emoji: "✨", gradient: `linear-gradient(135deg, #FFFDE7, #FFF176)`,
    image: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=400&q=80",
    stock: 38, calories: 58, protein: "4.2g",
  },
  {
    id: 6, name: "Salted Caramel Makhana", flavor: "Caramel",
    price: 309, originalPrice: 369, weight: "100g",
    rating: 4.8, reviews: 1567, badge: "Fan Fav",
    badgeColor: C.amberDark,
    description: "Buttery caramel meets a pinch of sea salt in this cinematic combination. A sweet-savory masterclass in snacking.",
    highlights: ["Slow Roasted", "Natural Caramel", "Satisfying Sweet", "No HFCS"],
    emoji: "🍮", gradient: `linear-gradient(135deg, #FEF3C7, #FDE68A)`,
    image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&q=80",
    stock: 20, calories: 78, protein: "3.8g",
  },
  {
    id: 7, name: "Cheesy Herb Makhana", flavor: "Cheesy Herb",
    price: 299, originalPrice: 349, weight: "100g",
    rating: 4.7, reviews: 943, badge: "New",
    badgeColor: "#10B981",
    description: "Nutritional yeast gives an authentic cheesy flavor while rosemary and thyme add sophisticated herbal notes. Vegan cheese lovers rejoice.",
    highlights: ["Vegan Cheese", "B-Vitamins", "Herb Infused", "Savory Delight"],
    emoji: "🧀", gradient: `linear-gradient(135deg, #ECFDF5, #A7F3D0)`,
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&q=80",
    stock: 45, calories: 63, protein: "5g",
  },
  {
    id: 8, name: "Masala Magic Makhana", flavor: "Masala",
    price: 259, originalPrice: 299, weight: "100g",
    rating: 4.6, reviews: 1089, badge: "Desi Fav",
    badgeColor: "#7C3AED",
    description: "A medley of aromatic Indian spices — chaat masala, amchur, and roasted cumin — that transport you to the streets of Old Delhi.",
    highlights: ["Authentic Spices", "Probiotic Friendly", "Chat Worthy", "Zero Trans Fat"],
    emoji: "🌿", gradient: `linear-gradient(135deg, #EDE9FE, #C4B5FD)`,
    image: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=400&q=80",
    stock: 55, calories: 62, protein: "4.3g",
  },
];

const TESTIMONIALS = [
  { name: "Priya Sharma", city: "Mumbai", text: "Finally a healthy snack my kids are obsessed with! The Dark Chocolate flavor is unreal.", stars: 5, avatar: "PS" },
  { name: "Rahul Verma", city: "Delhi", text: "Replaced my evening chips with Makhana. Lost 4kg in 2 months and don't feel deprived at all!", stars: 5, avatar: "RV" },
  { name: "Ananya Gupta", city: "Bangalore", text: "The Peri Peri flavor is dangerously good. Always keep 3 packets stocked at home.", stars: 5, avatar: "AG" },
  { name: "Vikram Singh", city: "Pune", text: "Premium quality, great packaging, and delivered in 2 days. 10/10 would recommend.", stars: 5, avatar: "VS" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const formatPrice = (p) => `₹${p}`;
const discount = (orig, curr) => Math.round(((orig - curr) / orig) * 100);

function useLocalStorage(key, init) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; } catch { return init; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }, [key, val]);
  return [val, setVal];
}

// ─── Components ───────────────────────────────────────────────────────────────

function FloatingBubbles() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: `${30 + i * 20}px`, height: `${30 + i * 20}px`,
          borderRadius: "50%",
          background: `rgba(255,255,255,${0.04 + i * 0.01})`,
          left: `${10 + i * 12}%`,
          top: `${20 + (i % 3) * 25}%`,
          animation: `floatBubble ${4 + i}s ease-in-out infinite alternate`,
          animationDelay: `${i * 0.5}s`,
        }} />
      ))}
    </div>
  );
}

function ProductCard({ product, onAddToCart, onViewDetails, wishlist, onToggleWish }) {
  const [hovering, setHovering] = useState(false);
  const isWished = wishlist.includes(product.id);
  const disc = discount(product.originalPrice, product.price);

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{
        borderRadius: 20, overflow: "hidden", background: C.white,
        boxShadow: hovering ? "0 20px 60px rgba(45,106,79,0.18)" : "0 4px 20px rgba(0,0,0,0.07)",
        transform: hovering ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        cursor: "pointer", border: "1.5px solid #E8F5E9", height: "100%", display: "flex", flexDirection: "column",
      }}
    >
      {/* Image area */}
      <div
        onClick={() => onViewDetails(product)}
        style={{ background: product.gradient, padding: "28px 28px 20px", position: "relative", minHeight: 180, display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div style={{ fontSize: 80, userSelect: "none", filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.12))" }}>
          {product.emoji}
        </div>
        {/* Badge */}
        <div style={{ position: "absolute", top: 14, left: 14, background: product.badgeColor, color: C.white, borderRadius: 20, padding: "3px 12px", fontSize: 11, fontWeight: 800, letterSpacing: 0.5 }}>
          {product.badge}
        </div>
        {/* Discount */}
        <div style={{ position: "absolute", top: 14, right: 48, background: C.orange, color: C.white, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>
          {disc}% OFF
        </div>
        {/* Wishlist */}
        <button
          onClick={e => { e.stopPropagation(); onToggleWish(product.id); }}
          style={{ position: "absolute", top: 12, right: 12, background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
        >
          {isWished ? <HeartFilled style={{ color: "#EF4444" }} /> : <HeartOutlined style={{ color: C.gray500 }} />}
        </button>
        {/* Stock warning */}
        {product.stock < 30 && (
          <div style={{ position: "absolute", bottom: 10, left: 14, background: "rgba(0,0,0,0.6)", color: "#FFF", borderRadius: 10, padding: "2px 10px", fontSize: 11 }}>
            Only {product.stock} left
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "18px 20px 20px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        <div onClick={() => onViewDetails(product)}>
          <Tag color="green" style={{ borderRadius: 20, fontSize: 10, marginBottom: 6 }}>{product.flavor}</Tag>
          <div style={{ fontWeight: 800, fontSize: 16, color: C.gray900, lineHeight: 1.3, marginBottom: 4 }}>{product.name}</div>
          <div style={{ fontSize: 12, color: C.gray500 }}>{product.weight} · {product.calories} cal/serving</div>
        </div>

        {/* Rating */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Rate disabled defaultValue={product.rating} allowHalf style={{ fontSize: 12 }} />
          <Text style={{ fontSize: 12, color: C.gray500 }}>({product.reviews.toLocaleString()})</Text>
        </div>

        {/* Highlights */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {product.highlights.slice(0, 2).map(h => (
            <span key={h} style={{ background: C.greenLight, color: C.greenDark, borderRadius: 10, padding: "2px 8px", fontSize: 10, fontWeight: 600 }}>{h}</span>
          ))}
        </div>

        {/* Price + CTA */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 8 }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 22, color: C.green, lineHeight: 1 }}>{formatPrice(product.price)}</div>
            <div style={{ fontSize: 12, color: C.gray500, textDecoration: "line-through" }}>{formatPrice(product.originalPrice)}</div>
          </div>
          <Button
            type="primary"
            size="large"
            icon={<ShoppingCartOutlined />}
            onClick={e => { e.stopPropagation(); onAddToCart(product); }}
            style={{ borderRadius: 12, fontWeight: 700, background: C.green, borderColor: C.green, boxShadow: "0 4px 14px rgba(45,106,79,0.4)" }}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}

function ProductModal({ product, onClose, onAddToCart }) {
  const [qty, setQty] = useState(1);
  if (!product) return null;

  return (
    <Modal
      open={!!product}
      onCancel={onClose}
      footer={null}
      width={760}
      style={{ top: 30 }}
      styles={{ body: { padding: 0 }, content: { borderRadius: 24, overflow: "hidden" } }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        {/* Left */}
        <div style={{ flex: "0 0 320px", background: product.gradient, display: "flex", alignItems: "center", justifyContent: "center", padding: 40, minHeight: 480 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 120, marginBottom: 16 }}>{product.emoji}</div>
            <Tag color="green" style={{ borderRadius: 20 }}>{product.flavor}</Tag>
          </div>
        </div>
        {/* Right */}
        <div style={{ flex: 1, padding: "36px 32px", overflowY: "auto", maxHeight: 560 }}>
          <div style={{ background: product.badgeColor, color: C.white, borderRadius: 20, padding: "4px 14px", fontSize: 11, fontWeight: 800, display: "inline-block", marginBottom: 12 }}>{product.badge}</div>
          <Title level={3} style={{ marginBottom: 4, color: C.gray900 }}>{product.name}</Title>
          <div style={{ color: C.gray500, marginBottom: 12 }}>{product.weight} · {product.calories} cal/serving · Protein: {product.protein}</div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <Rate disabled value={product.rating} allowHalf style={{ fontSize: 14 }} />
            <Text strong>{product.rating}</Text>
            <Text type="secondary">({product.reviews.toLocaleString()} reviews)</Text>
          </div>

          <Paragraph style={{ color: C.gray700, lineHeight: 1.7, marginBottom: 20 }}>{product.description}</Paragraph>

          <Divider />
          <div style={{ marginBottom: 16 }}>
            <Text strong style={{ color: C.gray700, display: "block", marginBottom: 8 }}>Why You'll Love It</Text>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {product.highlights.map(h => (
                <span key={h} style={{ background: C.greenLight, color: C.greenDark, borderRadius: 12, padding: "5px 14px", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                  <CheckCircleFilled style={{ fontSize: 10 }} /> {h}
                </span>
              ))}
            </div>
          </div>

          <Divider />
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
            <div>
              <div style={{ fontWeight: 900, fontSize: 32, color: C.green }}>{formatPrice(product.price)}</div>
              <div style={{ fontSize: 13, color: C.gray500 }}>
                <span style={{ textDecoration: "line-through" }}>{formatPrice(product.originalPrice)}</span>
                <span style={{ color: C.orange, fontWeight: 700, marginLeft: 8 }}>{discount(product.originalPrice, product.price)}% OFF</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Button icon={<MinusOutlined />} onClick={() => setQty(q => Math.max(1, q - 1))} shape="circle" />
              <span style={{ fontSize: 18, fontWeight: 700, width: 32, textAlign: "center" }}>{qty}</span>
              <Button icon={<PlusOutlined />} onClick={() => setQty(q => q + 1)} shape="circle" type="primary" />
            </div>
          </div>

          <Button
            type="primary" block size="large"
            icon={<ShoppingCartOutlined />}
            onClick={() => { for (let i = 0; i < qty; i++) onAddToCart(product); onClose(); }}
            style={{ borderRadius: 14, height: 52, fontWeight: 800, fontSize: 16, background: C.green, borderColor: C.green }}
          >
            Add {qty} to Cart — {formatPrice(product.price * qty)}
          </Button>
          <div style={{ display: "flex", gap: 16, marginTop: 16, justifyContent: "center" }}>
            {[{ icon: <TruckOutlined />, text: "Free delivery ₹499+" }, { icon: <SafetyOutlined />, text: "Secure checkout" }, { icon: <GiftOutlined />, text: "Gift wrapping" }].map(({ icon, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: C.gray500 }}>
                {icon} {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

function CartDrawer({ open, onClose, cart, onUpdateQty, onRemove, onCheckout }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <Drawer
      title={
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <ShoppingCartOutlined style={{ fontSize: 22, color: C.green }} />
          <span style={{ fontWeight: 800, fontSize: 18 }}>Your Cart</span>
          <Badge count={totalItems} style={{ backgroundColor: C.green }} />
        </div>
      }
      open={open} onClose={onClose} width={420}
      extra={<Button type="text" icon={<CloseOutlined />} onClick={onClose} />}
      footer={
        cart.length > 0 && (
          <div style={{ padding: "8px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <Text>Subtotal</Text><Text strong>{formatPrice(total)}</Text>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <Text type="secondary">Delivery</Text>
              <Text type="secondary" style={{ color: total >= 499 ? C.green : undefined }}>
                {total >= 499 ? "FREE 🎉" : formatPrice(49)}
              </Text>
            </div>
            {total < 499 && (
              <div style={{ background: C.greenLight, borderRadius: 10, padding: "8px 12px", marginBottom: 12, fontSize: 12, color: C.greenDark }}>
                Add {formatPrice(499 - total)} more for free delivery!
                <Progress percent={Math.round((total / 499) * 100)} strokeColor={C.green} showInfo={false} size="small" style={{ marginTop: 4 }} />
              </div>
            )}
            <Button
              type="primary" block size="large"
              icon={<ArrowRightOutlined />}
              onClick={onCheckout}
              style={{ borderRadius: 12, height: 50, fontWeight: 800, fontSize: 16, background: C.green, borderColor: C.green }}
            >
              Checkout — {formatPrice(total + (total >= 499 ? 0 : 49))}
            </Button>
          </div>
        )
      }
    >
      {cart.length === 0 ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60%", gap: 16 }}>
          <div style={{ fontSize: 64 }}>🛒</div>
          <Title level={4} style={{ color: C.gray500 }}>Your cart is empty</Title>
          <Text type="secondary">Start adding some healthy snacks!</Text>
          <Button type="primary" onClick={onClose} style={{ background: C.green, borderColor: C.green }}>Shop Now</Button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {cart.map(item => (
            <div key={item.id} style={{ display: "flex", gap: 14, background: C.gray50, borderRadius: 14, padding: 14, border: "1px solid #E8F5E9" }}>
              <div style={{ width: 64, height: 64, borderRadius: 12, background: item.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, flexShrink: 0 }}>
                {item.emoji}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.gray900, lineHeight: 1.3 }}>{item.name}</div>
                <div style={{ fontSize: 12, color: C.gray500, marginBottom: 8 }}>{item.weight}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Button size="small" icon={<MinusOutlined />} onClick={() => onUpdateQty(item.id, item.qty - 1)} />
                    <span style={{ fontWeight: 700, width: 24, textAlign: "center" }}>{item.qty}</span>
                    <Button size="small" icon={<PlusOutlined />} onClick={() => onUpdateQty(item.id, item.qty + 1)} type="primary" style={{ background: C.green, borderColor: C.green }} />
                  </div>
                  <div style={{ fontWeight: 800, color: C.green }}>{formatPrice(item.price * item.qty)}</div>
                </div>
              </div>
              <Button
                type="text" danger size="small"
                icon={<DeleteOutlined />}
                onClick={() => onRemove(item.id)}
                style={{ alignSelf: "flex-start" }}
              />
            </div>
          ))}
        </div>
      )}
    </Drawer>
  );
}

function CheckoutPage({ cart, onBack, onPlaceOrder }) {
  const [step, setStep] = useState(0);
  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [cardForm] = Form.useForm();

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = subtotal >= 499 ? 0 : 49;
  const total = subtotal + delivery;

  const handleShipping = async () => {
    await form.validateFields();
    setStep(1);
  };

  const handlePayment = async () => {
    if (paymentMethod === "card") await cardForm.validateFields();
    setProcessing(true);
    setTimeout(() => { setProcessing(false); onPlaceOrder(); }, 2500);
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
      <Breadcrumb items={[{ title: <a onClick={onBack}>🏠 Shop</a> }, { title: "Checkout" }]} style={{ marginBottom: 24 }} />

      <Row gutter={[32, 32]}>
        <Col xs={24} lg={15}>
          <div style={{ background: C.white, borderRadius: 20, padding: 32, boxShadow: "0 4px 24px rgba(0,0,0,0.07)", border: "1.5px solid #E8F5E9" }}>
            <Steps current={step} style={{ marginBottom: 36 }}>
              <Step title="Shipping" icon={<TruckOutlined />} />
              <Step title="Payment" icon={<CreditCardOutlined />} />
            </Steps>

            {step === 0 && (
              <div>
                <Title level={4} style={{ color: C.gray900, marginBottom: 24 }}>Delivery Information</Title>
                <Form form={form} layout="vertical" size="large">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: "Required" }]}>
                        <Input prefix={<UserOutlined />} placeholder="Rahul" style={{ borderRadius: 10 }} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: "Required" }]}>
                        <Input placeholder="Sharma" style={{ borderRadius: 10 }} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Valid email required" }]}>
                    <Input prefix={<MailOutlined />} placeholder="rahul@example.com" style={{ borderRadius: 10 }} />
                  </Form.Item>
                  <Form.Item name="phone" label="Phone" rules={[{ required: true, pattern: /^\d{10}$/, message: "Enter 10-digit phone number" }]}>
                    <Input prefix={<PhoneOutlined />} addonBefore="+91" placeholder="9876543210" style={{ borderRadius: 10 }} />
                  </Form.Item>
                  <Form.Item name="address" label="Street Address" rules={[{ required: true, message: "Required" }]}>
                    <Input prefix={<EnvironmentOutlined />} placeholder="123 MG Road, Apartment 4B" style={{ borderRadius: 10 }} />
                  </Form.Item>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item name="city" label="City" rules={[{ required: true, message: "Required" }]}>
                        <Input placeholder="Mumbai" style={{ borderRadius: 10 }} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="state" label="State" rules={[{ required: true, message: "Required" }]}>
                        <Select placeholder="Select State" style={{ borderRadius: 10 }}>
                          {["Maharashtra", "Delhi", "Karnataka", "Gujarat", "Tamil Nadu", "Rajasthan", "UP", "Telangana", "West Bengal"].map(s => <Option key={s} value={s}>{s}</Option>)}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item name="pincode" label="PIN Code" rules={[{ required: true, pattern: /^\d{6}$/, message: "6-digit PIN" }]}>
                        <Input placeholder="400001" style={{ borderRadius: 10 }} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Button
                    type="primary" block size="large"
                    icon={<ArrowRightOutlined />}
                    onClick={handleShipping}
                    style={{ borderRadius: 12, height: 52, fontWeight: 800, fontSize: 16, background: C.green, borderColor: C.green }}
                  >
                    Continue to Payment
                  </Button>
                </Form>
              </div>
            )}

            {step === 1 && (
              <div>
                <Title level={4} style={{ color: C.gray900, marginBottom: 24 }}>Payment Method</Title>
                <Radio.Group value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} style={{ width: "100%" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                    {[
                      { value: "card", icon: <CreditCardOutlined />, label: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay" },
                      { value: "upi", icon: <MobileOutlined />, label: "UPI Payment", sub: "GPay, PhonePe, Paytm, BHIM" },
                      { value: "netbanking", icon: <BankOutlined />, label: "Net Banking", sub: "All major banks supported" },
                      { value: "cod", icon: <HomeOutlined />, label: "Cash on Delivery", sub: "Pay when delivered" },
                    ].map(m => (
                      <Radio key={m.value} value={m.value} style={{ display: "block" }}>
                        <div style={{
                          border: `2px solid ${paymentMethod === m.value ? C.green : C.gray300}`,
                          borderRadius: 14, padding: "14px 20px",
                          background: paymentMethod === m.value ? C.greenLight : C.white,
                          display: "flex", alignItems: "center", gap: 14, cursor: "pointer",
                          transition: "all 0.2s",
                        }}>
                          <span style={{ fontSize: 22, color: paymentMethod === m.value ? C.green : C.gray500 }}>{m.icon}</span>
                          <div>
                            <div style={{ fontWeight: 700, color: C.gray900 }}>{m.label}</div>
                            <div style={{ fontSize: 12, color: C.gray500 }}>{m.sub}</div>
                          </div>
                          {paymentMethod === m.value && <CheckCircleFilled style={{ marginLeft: "auto", color: C.green, fontSize: 20 }} />}
                        </div>
                      </Radio>
                    ))}
                  </div>
                </Radio.Group>

                {paymentMethod === "card" && (
                  <div style={{ background: C.gray50, borderRadius: 14, padding: 24, marginBottom: 24, border: "1.5px solid #E8F5E9" }}>
                    <Title level={5} style={{ marginBottom: 16 }}>Card Details <Tag color="green"><LockOutlined /> Secured</Tag></Title>
                    <Form form={cardForm} layout="vertical">
                      <Form.Item name="cardNumber" label="Card Number" rules={[{ required: true, pattern: /^\d{16}$/, message: "Enter 16-digit card number" }]}>
                        <Input placeholder="4111 1111 1111 1111" maxLength={16} style={{ borderRadius: 10, letterSpacing: 2 }} />
                      </Form.Item>
                      <Form.Item name="cardName" label="Cardholder Name" rules={[{ required: true }]}>
                        <Input placeholder="RAHUL SHARMA" style={{ borderRadius: 10 }} />
                      </Form.Item>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item name="expiry" label="Expiry Date" rules={[{ required: true, pattern: /^\d{2}\/\d{2}$/, message: "MM/YY format" }]}>
                            <Input placeholder="MM/YY" maxLength={5} style={{ borderRadius: 10 }} />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item name="cvv" label="CVV" rules={[{ required: true, pattern: /^\d{3,4}$/, message: "3-4 digits" }]}>
                            <Input.Password placeholder="•••" maxLength={4} style={{ borderRadius: 10 }} />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                )}

                {paymentMethod === "upi" && (
                  <div style={{ background: C.gray50, borderRadius: 14, padding: 24, marginBottom: 24 }}>
                    <Form layout="vertical">
                      <Form.Item label="UPI ID">
                        <Input placeholder="yourname@paytm" addonAfter="Verify" style={{ borderRadius: 10 }} />
                      </Form.Item>
                    </Form>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                      {["GPay", "PhonePe", "Paytm", "BHIM"].map(app => (
                        <div key={app} style={{ background: C.white, border: `1.5px solid ${C.gray300}`, borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                          {app}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Alert
                  message="100% Secure Payment"
                  description="Your payment info is encrypted with 256-bit SSL. We never store your card details."
                  type="success" showIcon
                  style={{ borderRadius: 12, marginBottom: 24 }}
                />

                <div style={{ display: "flex", gap: 12 }}>
                  <Button size="large" onClick={() => setStep(0)} style={{ borderRadius: 12, flex: "0 0 120px" }}>← Back</Button>
                  <Button
                    type="primary" size="large" block
                    loading={processing}
                    onClick={handlePayment}
                    style={{ borderRadius: 12, height: 52, fontWeight: 800, fontSize: 16, background: C.green, borderColor: C.green }}
                    icon={processing ? undefined : <LockOutlined />}
                  >
                    {processing ? "Processing Payment..." : paymentMethod === "cod" ? "Place Order (COD)" : `Pay ${formatPrice(total)} Securely`}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Col>

        {/* Order Summary */}
        <Col xs={24} lg={9}>
          <div style={{ background: C.white, borderRadius: 20, padding: 28, boxShadow: "0 4px 24px rgba(0,0,0,0.07)", border: "1.5px solid #E8F5E9", position: "sticky", top: 24 }}>
            <Title level={5} style={{ marginBottom: 20, color: C.gray900 }}>Order Summary</Title>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: item.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{item.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.gray900, lineHeight: 1.3 }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: C.gray500 }}>Qty: {item.qty}</div>
                  </div>
                  <div style={{ fontWeight: 700, color: C.green }}>{formatPrice(item.price * item.qty)}</div>
                </div>
              ))}
            </div>
            <Divider />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text type="secondary">Subtotal</Text><Text>{formatPrice(subtotal)}</Text>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text type="secondary">Delivery</Text>
                <Text style={{ color: delivery === 0 ? C.green : undefined }}>{delivery === 0 ? "FREE" : formatPrice(delivery)}</Text>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text type="secondary">Tax (GST 5%)</Text>
                <Text>{formatPrice(Math.round(subtotal * 0.05))}</Text>
              </div>
            </div>
            <Divider />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Text strong style={{ fontSize: 16 }}>Total</Text>
              <Text strong style={{ fontSize: 22, color: C.green }}>{formatPrice(total + Math.round(subtotal * 0.05))}</Text>
            </div>
            <div style={{ marginTop: 20, background: C.greenLight, borderRadius: 12, padding: 14 }}>
              {[{ icon: <TruckOutlined />, text: "Expected delivery: 2-4 business days" }, { icon: <GiftOutlined />, text: "Gift packaging available at checkout" }, { icon: <SafetyOutlined />, text: "Easy 7-day returns" }].map(({ icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, fontSize: 12, color: C.greenDark }}>
                  {icon} {text}
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

function OrderSuccess({ orderNum, onContinue }) {
  return (
    <div style={{ maxWidth: 600, margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
      <div style={{ background: C.white, borderRadius: 24, padding: "60px 48px", boxShadow: "0 20px 60px rgba(45,106,79,0.15)", border: "2px solid #A7F3D0" }}>
        <div style={{ fontSize: 80, marginBottom: 20 }}>🎉</div>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: C.greenLight, border: `3px solid ${C.greenMid}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          <CheckCircleFilled style={{ fontSize: 36, color: C.green }} />
        </div>
        <Title level={2} style={{ color: C.green, marginBottom: 8 }}>Order Placed!</Title>
        <Paragraph style={{ fontSize: 16, color: C.gray700, marginBottom: 8 }}>
          Thank you for choosing <strong>MakhanaVeda</strong>! 🌿
        </Paragraph>
        <div style={{ background: C.gray50, borderRadius: 12, padding: "16px 24px", marginBottom: 24, display: "inline-block" }}>
          <Text type="secondary" style={{ fontSize: 12 }}>Order Number</Text>
          <div style={{ fontWeight: 900, fontSize: 22, color: C.green, letterSpacing: 2 }}>#{orderNum}</div>
        </div>
        <Paragraph type="secondary" style={{ marginBottom: 32 }}>
          A confirmation email has been sent to your inbox. Your healthy snacks will arrive in <strong>2-4 business days</strong>.
        </Paragraph>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Button type="primary" size="large" onClick={onContinue} style={{ borderRadius: 12, background: C.green, borderColor: C.green, fontWeight: 700 }}>
            Continue Shopping
          </Button>
          <Button size="large" style={{ borderRadius: 12, borderColor: C.green, color: C.green, fontWeight: 700 }}>
            Track Order
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function MakhanaStore() {
  const [cart, setCart] = useLocalStorage("makhana_cart", []);
  const [wishlist, setWishlist] = useLocalStorage("makhana_wish", []);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [page, setPage] = useState("home"); // home | shop | checkout | success
  const [orderNum, setOrderNum] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filterFlavor, setFilterFlavor] = useState("All");
  const [filterPrice, setFilterPrice] = useState([0, 500]);
  const [sortBy, setSortBy] = useState("popular");
  const [filterOpen, setFilterOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter(p => {
      const matchFlavor = filterFlavor === "All" || p.flavor === filterFlavor;
      const matchPrice = p.price >= filterPrice[0] && p.price <= filterPrice[1];
      const matchSearch = !searchText || p.name.toLowerCase().includes(searchText.toLowerCase()) || p.flavor.toLowerCase().includes(searchText.toLowerCase());
      return matchFlavor && matchPrice && matchSearch;
    });
    if (sortBy === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sortBy === "popular") list = [...list].sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [filterFlavor, filterPrice, searchText, sortBy]);

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    api.success({
      message: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
      placement: "bottomRight", duration: 2,
      icon: <span style={{ fontSize: 20 }}>{product.emoji}</span>,
      style: { borderRadius: 14 },
    });
  }, []);

  const updateQty = useCallback((id, qty) => {
    if (qty < 1) { removeFromCart(id); return; }
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  }, []);

  const toggleWish = useCallback((id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  }, []);

  const placeOrder = useCallback(() => {
    const num = `MV${Date.now().toString().slice(-6)}`;
    setOrderNum(num);
    setCart([]);
    setPage("success");
  }, []);

  return (
    <ConfigProvider theme={THEME}>
      {contextHolder}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; font-family: 'Nunito', sans-serif; background: #FAFAF8; }
        @keyframes floatBubble { 0%{transform:translateY(0) scale(1)} 100%{transform:translateY(-20px) scale(1.05)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
        .product-grid { animation: fadeInUp 0.5s ease both; }
        .hero-text { animation: fadeInUp 0.7s ease both; }
      `}</style>

      <Layout style={{ minHeight: "100vh", background: "#FAFAF8" }}>
        {/* ── HEADER ── */}
        <Header style={{
          position: "sticky", top: 0, zIndex: 1000,
          background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)",
          borderBottom: "1.5px solid #E8F5E9", boxShadow: "0 2px 20px rgba(45,106,79,0.08)",
          height: "auto", lineHeight: "normal", padding: 0,
        }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
            {/* Logo */}
            <div onClick={() => { setPage("home"); setSearchText(""); }} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: `linear-gradient(135deg, ${C.green}, ${C.greenMid})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, boxShadow: "0 4px 12px rgba(45,106,79,0.3)" }}>
                🌿
              </div>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 22, color: C.green, lineHeight: 1 }}>MakhanaVeda</div>
                <div style={{ fontSize: 10, color: C.gray500, letterSpacing: 1, textTransform: "uppercase" }}>Premium Fox Nuts</div>
              </div>
            </div>

            {/* Nav */}
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Button type={page === "home" ? "primary" : "text"} onClick={() => setPage("home")} style={{ borderRadius: 10, background: page === "home" ? C.green : undefined, borderColor: C.green }}>Home</Button>
              <Button type={page === "shop" ? "primary" : "text"} onClick={() => setPage("shop")} style={{ borderRadius: 10, background: page === "shop" ? C.green : undefined, borderColor: C.green }}>Shop</Button>
              <Badge count={wishlist.length} style={{ backgroundColor: C.orange }}>
                <Button type="text" icon={<HeartOutlined />} style={{ borderRadius: 10 }} />
              </Badge>
              <Badge count={totalItems} style={{ backgroundColor: C.green }}>
                <Button
                  type="primary" icon={<ShoppingCartOutlined />} onClick={() => setCartOpen(true)}
                  style={{ borderRadius: 10, background: C.green, borderColor: C.green, fontWeight: 700 }}
                >
                  Cart
                </Button>
              </Badge>
            </div>
          </div>
        </Header>

        <Content>
          {/* ══ HOME ══ */}
          {page === "home" && (
            <>
              {/* Hero */}
              <div style={{ background: `linear-gradient(135deg, ${C.greenDark} 0%, ${C.green} 50%, #40916C 100%)`, minHeight: "82vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
                <FloatingBubbles />
                <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 70% 50%, rgba(255,255,255,0.04) 0%, transparent 60%)" }} />
                <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px", display: "flex", alignItems: "center", gap: 60, width: "100%", position: "relative", zIndex: 1 }}>
                  <div style={{ flex: 1 }} className="hero-text">
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", borderRadius: 30, padding: "8px 18px", marginBottom: 24, border: "1px solid rgba(255,255,255,0.2)" }}>
                      {/* <LeafOutlined style={{ color: C.amber }} /> */}
                      <span style={{ color: C.white, fontWeight: 700, fontSize: 13 }}>India's #1 Premium Makhana Brand</span>
                    </div>
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px, 5vw, 68px)", fontWeight: 800, color: C.white, lineHeight: 1.15, marginBottom: 20, margin: "0 0 20px" }}>
                      Snack Smarter.<br />
                      <span style={{ color: C.amber }}>Live Better.</span>
                    </h1>
                    <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, maxWidth: 480, marginBottom: 36 }}>
                      Air-popped lotus seeds packed with protein, minerals and guilt-free crunch. 8 flavors crafted for the modern health-conscious foodie.
                    </p>
                    <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
                      <Button
                        type="primary" size="large"
                        onClick={() => setPage("shop")}
                        style={{ borderRadius: 14, height: 54, padding: "0 32px", fontWeight: 800, fontSize: 16, background: C.amber, borderColor: C.amber, color: C.brown, boxShadow: "0 8px 24px rgba(233,196,106,0.4)" }}
                        icon={<RocketOutlined />}
                      >
                        Shop Now
                      </Button>
                      <Button size="large" style={{ borderRadius: 14, height: 54, padding: "0 28px", fontWeight: 700, fontSize: 16, background: "rgba(255,255,255,0.12)", border: "2px solid rgba(255,255,255,0.4)", color: C.white }}>
                        Our Story ↗
                      </Button>
                    </div>
                    <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                      {[{ num: "50K+", label: "Happy Snackers" }, { num: "8", label: "Unique Flavors" }, { num: "4.8★", label: "Avg Rating" }, { num: "100%", label: "Natural" }].map(s => (
                        <div key={s.label}>
                          <div style={{ fontWeight: 900, fontSize: 24, color: C.amber }}>{s.num}</div>
                          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ flex: "0 0 auto", textAlign: "center", display: "flex", flexDirection: "column", gap: 20 }}>
                    <div style={{ fontSize: 160, filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.3))", animation: "pulse 3s ease-in-out infinite" }}>🌰</div>
                    <div style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", borderRadius: 20, padding: "16px 28px", border: "1px solid rgba(255,255,255,0.2)" }}>
                      <div style={{ color: C.amber, fontWeight: 800, fontSize: 18 }}>Free delivery</div>
                      <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>on orders above ₹499</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features bar */}
              <div style={{ background: C.white, borderBottom: "1.5px solid #E8F5E9" }}>
                <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px", display: "flex", gap: 0, overflowX: "auto" }}>
                  {[
                    { icon: <TruckOutlined />, title: "Free Delivery", sub: "On ₹499+" },
                   
                    { icon: <SafetyOutlined />, title: "FSSAI Certified", sub: "Quality assured" },
                    { icon: <ThunderboltOutlined />, title: "High Protein", sub: "9g per 100g" },
                    { icon: <GiftOutlined />, title: "Gift Packs", sub: "Available now" },
                    { icon: <FireOutlined />, title: "Low Calorie", sub: "Only 55 cal/serve" },
                  ].map((f, i) => (
                    <div key={f.title} style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: 12, padding: "0 32px", borderRight: i < 5 ? "1.5px solid #E8F5E9" : "none" }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: C.greenLight, display: "flex", alignItems: "center", justifyContent: "center", color: C.green, fontSize: 18 }}>{f.icon}</div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: 14, color: C.gray900 }}>{f.title}</div>
                        <div style={{ fontSize: 11, color: C.gray500 }}>{f.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Best Sellers */}
              <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
                <div style={{ textAlign: "center", marginBottom: 52 }}>
                  <Tag color="green" style={{ marginBottom: 12, borderRadius: 20, padding: "4px 16px", fontSize: 13 }}>🏆 Best Sellers</Tag>
                  <Title level={2} style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, color: C.gray900, marginBottom: 12 }}>
                    Fan Favorites
                  </Title>
                  <Paragraph type="secondary" style={{ fontSize: 16, maxWidth: 500, margin: "0 auto" }}>
                    Our most loved flavors, handpicked by 50,000+ happy snackers
                  </Paragraph>
                </div>
                <Row gutter={[24, 24]}>
                  {PRODUCTS.slice(0, 4).map(p => (
                    <Col key={p.id} xs={24} sm={12} lg={6}>
                      <div className="product-grid">
                        <ProductCard product={p} onAddToCart={addToCart} onViewDetails={setSelectedProduct} wishlist={wishlist} onToggleWish={toggleWish} />
                      </div>
                    </Col>
                  ))}
                </Row>
                <div style={{ textAlign: "center", marginTop: 40 }}>
                  <Button size="large" onClick={() => setPage("shop")} style={{ borderRadius: 12, height: 50, padding: "0 40px", fontWeight: 700, color: C.green, borderColor: C.green }}>
                    View All 8 Flavors <ArrowRightOutlined />
                  </Button>
                </div>
              </div>

              {/* Why Makhana */}
              <div style={{ background: `linear-gradient(135deg, #F0FFF4, #DCFCE7)`, padding: "80px 24px" }}>
                <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 80, flexWrap: "wrap" }}>
                    <div style={{ flex: 1, minWidth: 280 }}>
                      <Tag color="green" style={{ marginBottom: 12, borderRadius: 20, padding: "4px 16px" }}>Why Makhana?</Tag>
                      <Title level={2} style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, color: C.gray900, marginBottom: 20 }}>
                        Nature's Most<br />Perfect Snack
                      </Title>
                      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {[
                          { icon: "💪", title: "High in Protein", desc: "9g of plant protein per 100g — builds muscle, keeps you full longer." },
                          { icon: "⚡", title: "Energy Booster", desc: "Complex carbs provide sustained energy without blood sugar spikes." },
                          { icon: "🫀", title: "Heart Healthy", desc: "Low sodium, low cholesterol. Supports cardiovascular health naturally." },
                          { icon: "😴", title: "Better Sleep", desc: "Rich in magnesium and tryptophan — promotes relaxation and quality sleep." },
                        ].map(b => (
                          <div key={b.title} style={{ display: "flex", gap: 14 }}>
                            <div style={{ fontSize: 28, flexShrink: 0 }}>{b.icon}</div>
                            <div>
                              <div style={{ fontWeight: 800, color: C.gray900, marginBottom: 2 }}>{b.title}</div>
                              <div style={{ fontSize: 13, color: C.gray600, lineHeight: 1.6 }}>{b.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ flex: 1, minWidth: 280 }}>
                      <div style={{ background: C.white, borderRadius: 24, padding: 36, boxShadow: "0 20px 60px rgba(45,106,79,0.12)" }}>
                        <div style={{ fontWeight: 800, fontSize: 16, color: C.gray900, marginBottom: 24 }}>Nutrition Facts (per 100g)</div>
                        {[
                          { label: "Calories", value: "347 kcal", pct: 17 },
                          { label: "Protein", value: "9.7g", pct: 20 },
                          { label: "Carbohydrates", value: "76.9g", pct: 26 },
                          { label: "Fat", value: "0.1g", pct: 1 },
                          { label: "Fiber", value: "14.5g", pct: 52 },
                          { label: "Magnesium", value: "67mg", pct: 16 },
                        ].map(n => (
                          <div key={n.label} style={{ marginBottom: 14 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                              <Text style={{ fontSize: 13, fontWeight: 600 }}>{n.label}</Text>
                              <Text style={{ fontSize: 13, color: C.green, fontWeight: 700 }}>{n.value}</Text>
                            </div>
                            <Progress percent={n.pct} strokeColor={C.green} trailColor="#E8F5E9" showInfo={false} size="small" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonials */}
              <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
                <div style={{ textAlign: "center", marginBottom: 52 }}>
                  <Title level={2} style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800 }}>What Snackers Say</Title>
                </div>
                <Row gutter={[24, 24]}>
                  {TESTIMONIALS.map(t => (
                    <Col key={t.name} xs={24} sm={12} lg={6}>
                      <div style={{ background: C.white, borderRadius: 20, padding: 28, boxShadow: "0 4px 24px rgba(0,0,0,0.07)", border: "1.5px solid #E8F5E9", height: "100%" }}>
                        <Rate disabled value={t.stars} style={{ fontSize: 14, marginBottom: 14 }} />
                        <Paragraph style={{ color: C.gray700, lineHeight: 1.7, fontSize: 14, marginBottom: 20 }}>
                          "{t.text}"
                        </Paragraph>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${C.green}, ${C.greenMid})`, display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontWeight: 800 }}>{t.avatar}</div>
                          <div>
                            <div style={{ fontWeight: 700, color: C.gray900, fontSize: 14 }}>{t.name}</div>
                            <div style={{ fontSize: 12, color: C.gray500 }}>{t.city}</div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>

              {/* CTA Banner */}
              <div style={{ background: `linear-gradient(135deg, ${C.brown}, #8B4513)`, margin: "0 0 0", padding: "80px 24px", textAlign: "center" }}>
                <div style={{ maxWidth: 600, margin: "0 auto" }}>
                  <Title level={2} style={{ fontFamily: "'Playfair Display', serif", color: C.white, fontWeight: 800, marginBottom: 12 }}>
                    Ready to Start Your Healthy Snacking Journey?
                  </Title>
                  <Paragraph style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, marginBottom: 32 }}>
                    Use code <strong style={{ color: C.amber }}>FIRSTBITE</strong> for 20% off your first order!
                  </Paragraph>
                  <Button
                    size="large" onClick={() => setPage("shop")}
                    style={{ borderRadius: 14, height: 54, padding: "0 40px", fontWeight: 800, fontSize: 16, background: C.amber, borderColor: C.amber, color: C.brown }}
                  >
                    Shop All Flavors <ArrowRightOutlined />
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* ══ SHOP ══ */}
          {page === "shop" && (
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 24px" }}>
              <div style={{ marginBottom: 36 }}>
                <Breadcrumb items={[{ title: <a onClick={() => setPage("home")}>Home</a> }, { title: "Shop" }]} style={{ marginBottom: 12 }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                  <div>
                    <Title level={2} style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, marginBottom: 4 }}>All Flavors</Title>
                    <Text type="secondary">{filtered.length} products found</Text>
                  </div>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                    <Input
                      prefix={<SearchOutlined />} placeholder="Search flavors..."
                      value={searchText} onChange={e => setSearchText(e.target.value)}
                      style={{ width: 220, borderRadius: 12 }}
                      allowClear
                    />
                    <Select value={sortBy} onChange={setSortBy} style={{ width: 160, borderRadius: 12 }}>
                      <Option value="popular">Most Popular</Option>
                      <Option value="rating">Top Rated</Option>
                      <Option value="price-asc">Price: Low → High</Option>
                      <Option value="price-desc">Price: High → Low</Option>
                    </Select>
                    <Button icon={<FilterOutlined />} onClick={() => setFilterOpen(true)} style={{ borderRadius: 12, borderColor: C.green, color: C.green }}>Filters</Button>
                  </div>
                </div>
              </div>

              {/* Flavor Tabs */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
                {FLAVORS.map(f => (
                  <button
                    key={f}
                    onClick={() => setFilterFlavor(f)}
                    style={{
                      padding: "8px 18px", borderRadius: 30, border: "1.5px solid",
                      borderColor: filterFlavor === f ? C.green : C.gray300,
                      background: filterFlavor === f ? C.green : C.white,
                      color: filterFlavor === f ? C.white : C.gray700,
                      fontWeight: 700, cursor: "pointer", transition: "all 0.2s", fontSize: 13,
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {filtered.length === 0 ? (
                <Empty description="No products match your filters" style={{ padding: "80px 0" }}>
                  <Button type="primary" onClick={() => { setFilterFlavor("All"); setSearchText(""); setFilterPrice([0, 500]); }} style={{ background: C.green, borderColor: C.green }}>Clear Filters</Button>
                </Empty>
              ) : (
                <Row gutter={[24, 28]}>
                  {filtered.map(p => (
                    <Col key={p.id} xs={24} sm={12} lg={8} xl={6}>
                      <div className="product-grid">
                        <ProductCard product={p} onAddToCart={addToCart} onViewDetails={setSelectedProduct} wishlist={wishlist} onToggleWish={toggleWish} />
                      </div>
                    </Col>
                  ))}
                </Row>
              )}

              {/* Filter Drawer */}
              <Drawer
                title={<><FilterOutlined /> Filters</>}
                open={filterOpen} onClose={() => setFilterOpen(false)} width={320}
                footer={
                  <div style={{ display: "flex", gap: 10 }}>
                    <Button block onClick={() => { setFilterFlavor("All"); setFilterPrice([0, 500]); }}>Reset</Button>
                    <Button type="primary" block onClick={() => setFilterOpen(false)} style={{ background: C.green, borderColor: C.green }}>Apply</Button>
                  </div>
                }
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                  <div>
                    <Text strong style={{ display: "block", marginBottom: 12 }}>Flavor</Text>
                    <Select value={filterFlavor} onChange={setFilterFlavor} style={{ width: "100%" }}>
                      {FLAVORS.map(f => <Option key={f} value={f}>{f}</Option>)}
                    </Select>
                  </div>
                  <div>
                    <Text strong style={{ display: "block", marginBottom: 12 }}>Price Range: {formatPrice(filterPrice[0])} – {formatPrice(filterPrice[1])}</Text>
                    <Slider range min={0} max={500} value={filterPrice} onChange={setFilterPrice} trackStyle={[{ backgroundColor: C.green }]} handleStyle={[{ borderColor: C.green }, { borderColor: C.green }]} />
                  </div>
                </div>
              </Drawer>
            </div>
          )}

          {/* ══ CHECKOUT ══ */}
          {page === "checkout" && (
            <CheckoutPage cart={cart} onBack={() => setPage("shop")} onPlaceOrder={placeOrder} />
          )}

          {/* ══ SUCCESS ══ */}
          {page === "success" && (
            <OrderSuccess orderNum={orderNum} onContinue={() => { setPage("home"); setOrderNum(null); }} />
          )}
        </Content>

        {/* ── FOOTER ── */}
        {(page === "home" || page === "shop") && (
          <Footer style={{ background: C.greenDark, padding: "60px 24px 32px" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
              <Row gutter={[40, 40]}>
                <Col xs={24} md={8}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                    <div style={{ fontSize: 28 }}>🌿</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 22, color: C.white }}>MakhanaVeda</div>
                  </div>
                  <Paragraph style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: 20 }}>
                    Bringing the ancient superfood of Bihar to modern snack lovers. Premium quality, authentic taste, zero compromises.
                  </Paragraph>
                  <div style={{ display: "flex", gap: 10 }}>
                    {["📘", "📸", "▶️", "💼"].map(s => (
                      <div key={s} style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16 }}>{s}</div>
                    ))}
                  </div>
                </Col>
                <Col xs={12} md={5}>
                  <Text strong style={{ color: C.white, display: "block", marginBottom: 16, fontSize: 14 }}>Quick Links</Text>
                  {["About Us", "Our Story", "Blog", "Careers", "Press"].map(l => (
                    <div key={l} style={{ color: "rgba(255,255,255,0.6)", marginBottom: 10, cursor: "pointer", fontSize: 13 }}>{l}</div>
                  ))}
                </Col>
                <Col xs={12} md={5}>
                  <Text strong style={{ color: C.white, display: "block", marginBottom: 16, fontSize: 14 }}>Support</Text>
                  {["FAQs", "Shipping Policy", "Return Policy", "Track Order", "Contact Us"].map(l => (
                    <div key={l} style={{ color: "rgba(255,255,255,0.6)", marginBottom: 10, cursor: "pointer", fontSize: 13 }}>{l}</div>
                  ))}
                </Col>
                <Col xs={24} md={6}>
                  <Text strong style={{ color: C.white, display: "block", marginBottom: 16, fontSize: 14 }}>Stay in the Loop</Text>
                  <Paragraph style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 14 }}>Get exclusive deals & healthy snacking tips</Paragraph>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Input placeholder="Enter email" style={{ borderRadius: 10, flex: 1 }} />
                    <Button type="primary" style={{ borderRadius: 10, background: C.amber, borderColor: C.amber }}>→</Button>
                  </div>
                  <div style={{ marginTop: 20 }}>
                    {[{ icon: <MailOutlined />, text: "hello@makhanaveda.in" }, { icon: <PhoneOutlined />, text: "+91 98765 43210" }].map(c => (
                      <div key={c.text} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
                        {c.icon} {c.text}
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
              <Divider style={{ borderColor: "rgba(255,255,255,0.1)", margin: "40px 0 24px" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
                  © 2024 MakhanaVeda Pvt. Ltd. All rights reserved. FSSAI Lic. No. 10019022009784
                </Text>
                <div style={{ display: "flex", gap: 16 }}>
                  {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(p => (
                    <Text key={p} style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, cursor: "pointer" }}>{p}</Text>
                  ))}
                </div>
              </div>
            </div>
          </Footer>
        )}
      </Layout>

      {/* Cart Drawer */}
      <CartDrawer
        open={cartOpen} onClose={() => setCartOpen(false)}
        cart={cart} onUpdateQty={updateQty} onRemove={removeFromCart}
        onCheckout={() => { setCartOpen(false); setPage("checkout"); }}
      />

      {/* Product Modal */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={addToCart} />
    </ConfigProvider>
  );
}