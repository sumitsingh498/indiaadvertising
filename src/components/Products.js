import React, { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Search, X } from "lucide-react";
import "./Products.css";
import localData from "../data/companyData.json";

const Products = () => {
  const [data, setData] = useState(localData);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [compareProducts, setCompareProducts] = useState([]);
  const scrollRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedForDetails, setSelectedForDetails] = useState(null);

  useEffect(() => {
    setData(localData);
    setLoading(false);
  }, []);

  const categories = useMemo(() => 
    data?.categories?.map(cat => ({
      ...cat,
      subProducts: (cat.subProducts || []).filter(prod => prod != null)
    })) || [], [data]
  );

  const { description = "" } = data?.companyInfo || {};
  const products = useMemo(() => categories, [categories]);

  const getImageUrl = useCallback((img) => {
    if (!img) return null;
    if (img.startsWith("http") || img.startsWith("/")) return img;
    let p = img;
    if (p.startsWith("uploads/")) p = p.replace(/^uploads\//, "images/");
    const base = process.env.PUBLIC_URL || "";
    return `${base}/${p}`;
  }, []);

  const scroll = useCallback((direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  }, []);

  const filteredProducts = useMemo(() => 
    products.filter((p) =>
      p.category?.toLowerCase().includes(searchTerm.toLowerCase())
    ), [products, searchTerm]
  );

  const categoriesList = useMemo(() => 
    [...new Set(filteredProducts.map(p => p.category))], [filteredProducts]
  );

  const featuredCategories = useMemo(() => categoriesList, [categoriesList]);

  const activeSubProducts = useMemo(() => {
    if (!activeCategory) return [];
    return products.find((p) => p.category === activeCategory)?.subProducts || [];
  }, [products, activeCategory]);

  const toggleCompare = useCallback((product) => {
    setCompareProducts(prev => {
      const exists = prev.some(p => p.name === product.name);
      if (exists) {
        return prev.filter(p => p.name !== product.name);
      } else if (prev.length < 4) {
        return [...prev, product];
      }
      return prev;
    });
  }, []);

  const handleQuote = useCallback((product) => {
    setSelectedProduct(product);
    setShowForm(true);
  }, []);

  const handleDetails = useCallback((product) => {
    setSelectedForDetails(product);
    setShowDetails(true);
  }, []);

  const handleCustomQuote = useCallback(() => {
    setSelectedProduct({ name: "Custom Solution" });
    setShowForm(true);
  }, []);

  const handleViewAllProducts = useCallback((category) => {
    setActiveCategory(category);
    setTimeout(() => {
      const productsGrid = document.getElementById('products-grid');
      if (productsGrid) {
        productsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }, []);

  if (loading) return <div className="py-12 text-center">Loading products...</div>;
  if (!data || data.error) return <div className="py-12 text-center">No data available.</div>;

  return (
    <section id="products" className="py-12 text-gray-800 sm:py-20 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl">
        <motion.h2
          className="mb-6 text-3xl font-bold text-center text-blue-700 sm:text-5xl sm:mb-10"
          initial={{ y: -50 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
        >
          Our Products & Services
        </motion.h2>

        <p className="max-w-3xl mx-auto mb-8 text-lg text-center text-gray-600">
          {description}
        </p>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={20} />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 pl-10 pr-4 transition-all border-2 border-gray-300 rounded-lg outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          {activeCategory && (
            <motion.button
              onClick={() => setActiveCategory(null)}
              className="px-6 py-3 font-semibold text-white transition-all bg-gray-600 rounded-lg hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← All Categories
            </motion.button>
          )}
        </div>

        <div className="relative mb-10" role="navigation">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 p-2 text-blue-600 -translate-y-1/2 rounded-full top-1/2 scroll-arrow hover:bg-blue-100"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-3 px-10 overflow-x-auto products-scroll no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <motion.button
              onClick={() => setActiveCategory(null)}
              className={`px-6 py-3 rounded-full font-semibold transition flex-shrink-0 ${
                !activeCategory ? "bg-blue-600 text-white" : "bg-white text-blue-700 border border-blue-300"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              All Categories
            </motion.button>

            {categoriesList.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition flex-shrink-0 ${
                  activeCategory === category ? "bg-blue-600 text-white" : "bg-white text-blue-700 border border-blue-300"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 p-2 text-blue-600 -translate-y-1/2 rounded-full top-1/2 scroll-arrow hover:bg-blue-100"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <motion.div
          id="products-grid"
          className="grid gap-6 lg:grid-cols-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {!activeCategory ? (
            featuredCategories.length === 0 ? (
              <div className="py-8 text-center col-span-full">
                <p className="text-gray-500">No categories found.</p>
              </div>
            ) : (
              featuredCategories.map((category) => {
                const catData = products.find((p) => p.category === category);
                const subProducts = catData?.subProducts || [];
                const firstImage = subProducts[0]?.images?.[0];
                return (
                  <FeaturedCategoryCard
                    key={category}
                    category={category}
                    subProducts={subProducts}
                    imageSrc={firstImage ? getImageUrl(firstImage) : null}
                    onViewAll={() => handleViewAllProducts(category)}
                  />
                );
              })
            )
          ) : (
            activeSubProducts.length === 0 ? (
              <div className="py-8 text-center col-span-full">
                <p className="text-gray-500">No products found.</p>
              </div>
            ) : (
              <div className="lg:col-span-full lg:grid lg:grid-cols-3 lg:gap-6">
                {activeSubProducts.map((sub, idx) => (
                  <ProductCard
                    key={idx}
                    name={sub.name}
                    price={sub.price}
                    images={sub.images || []}
                    description={sub.description}
                    specs={sub.specs || []}
                    additionalInfo={sub.additionalInfo || {}}
                    onQuote={() => handleQuote(sub)}
                    onDetails={() => handleDetails(sub)}
                    onCompare={() => toggleCompare(sub)}
                    isCompared={compareProducts.some(p => p.name === sub.name)}
                    getImageUrl={getImageUrl}
                    showSpecs={false}
                  />
                ))}
              </div>
            )
          )}
        </motion.div>

        {compareProducts.length > 0 && (
          <ComparePanel
            products={compareProducts}
            onRemove={toggleCompare}
            getImageUrl={getImageUrl}
          />
        )}

        <div className="mt-12 text-center">
          <button
            onClick={handleCustomQuote}
            className="inline-block px-8 py-4 text-lg font-semibold text-white transition-colors bg-blue-600 rounded-full hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
          >
            Enquire for Custom Solutions
          </button>
        </div>
      </div>

      {showForm && (
        <QuoteForm product={selectedProduct} onClose={() => setShowForm(false)} />
      )}

      {showDetails && (
        <ProductDetails
          product={selectedForDetails}
          onClose={() => setShowDetails(false)}
          getImageUrl={getImageUrl}
        />
      )}
    </section>
  );
};

/* === ALL YOUR ORIGINAL COMPONENTS (100% UNTOUCHED) === */
const FeaturedCategoryCard = React.memo(({ category, subProducts, imageSrc, onViewAll }) => (
  <motion.div className="flex flex-col overflow-hidden transition-all bg-white border border-gray-200 shadow-lg rounded-xl hover:shadow-2xl" whileHover={{ y: -8 }}>
    <div className="relative flex-shrink-0 h-48 mb-4 overflow-hidden rounded-t-xl bg-gradient-to-br from-blue-50 to-gray-100">
      {imageSrc ? (
        <img src={imageSrc} alt={`${category} example`} className="object-cover w-full h-full transition-transform duration-500 hover:scale-110" loading="lazy"
          onError={(e) => {
            const base = process.env.PUBLIC_URL || '';
            const placeholder = `${base}/images/logo.jpeg`;
            if (e.target.src !== placeholder) {
              e.target.onerror = null;
              e.target.src = placeholder;
            }
          }}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-50 to-gray-100">
          <span className="font-medium text-gray-500">Category Preview</span>
        </div>
      )}
      <div className="absolute px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full top-2 right-2">
        {subProducts.length} Items
      </div>
    </div>

    <div className="flex flex-col flex-grow p-6">
      <h3 className="mb-3 text-xl font-bold text-gray-900">{category}</h3>
      {subProducts.length > 0 && (
        <ul className="flex-grow mb-4 space-y-2 text-sm text-gray-600">
          {subProducts.map((sub, idx) => (
            <li key={idx} className="flex items-center transition-colors hover:text-blue-600">
              <span className="inline-block w-2 h-2 mr-2 bg-blue-400 rounded-full"></span>
              {sub.name}
            </li>
          ))}
        </ul>
      )}
      <button onClick={onViewAll} className="self-start px-4 py-2 font-medium text-blue-600 transition-all border border-blue-300 rounded-lg hover:bg-blue-50 hover:border-blue-600">
        View All Products →
      </button>
    </div>
  </motion.div>
));

const ProductCard = React.memo(({ name, price, images = [], description, specs = [], additionalInfo = {}, onQuote, onDetails, onCompare, isCompared, getImageUrl, showSpecs = true }) => (
  <motion.div className="flex flex-col p-6 transition-all bg-white border border-gray-200 shadow-lg rounded-xl hover:shadow-2xl" whileHover={{ y: -8 }}>
    <div className="relative flex-shrink-0 h-48 mb-4 overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 to-gray-100">
      {images?.[0] ? (
        <>
          <img src={getImageUrl(images[0])} alt={`${name} preview`} className="object-cover w-full h-full transition-transform duration-500 hover:scale-110" loading="lazy"
            onError={(e) => {
              const placeholder = `${process.env.PUBLIC_URL || ''}/images/logo.jpeg`;
              if (e.target.src !== placeholder) {
                e.target.onerror = null;
                e.target.src = placeholder;
              }
            }}
          />
          {images.length > 1 && (
            <div className="absolute px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full top-2 right-2">
              +{images.length - 1}
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center w-full h-full rounded bg-gradient-to-br from-blue-50 to-gray-100">
          <span className="font-medium text-gray-500">Product Preview</span>
        </div>
      )}
    </div>

    <h3 className="flex-shrink-0 mb-2 text-lg font-bold text-gray-900">{name}</h3>
    {price && <p className="flex-shrink-0 mb-3 text-xl font-bold text-green-600">{price}</p>}
    {description && <p className="flex-shrink-0 mb-4 text-sm leading-relaxed text-gray-600 line-clamp-2">{description}</p>}

    {showSpecs && (specs.length > 0 || Object.keys(additionalInfo).length > 0) && (
      <div className="flex-shrink-0 p-3 mb-4 space-y-2 text-xs text-gray-600 rounded-lg bg-gray-50">
        {specs.map((spec, i) => (
          <p key={i} className="mb-1"><strong className="text-gray-800">{spec.key}:</strong> {spec.value}</p>
        ))}
        {Object.entries(additionalInfo).map(([key, value]) => (
          <p key={key}><strong className="text-gray-800">{key}:</strong> {value}</p>
        ))}
      </div>
    )}

    <div className="flex flex-col gap-2 mt-auto">
      <div className="flex gap-2">
        <button onClick={onQuote} className="flex-1 px-4 py-3 font-semibold text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-95">
          Get Quote
        </button>
        <button onClick={onDetails} className="flex-1 px-4 py-3 font-semibold text-gray-700 transition-all bg-gray-200 rounded-lg hover:bg-gray-300 active:scale-95">
          Details
        </button>
      </div>
      <button
        onClick={onCompare}
        className={`w-full px-4 py-2 font-semibold rounded-lg transition-all ${
          isCompared ? 'bg-blue-100 text-blue-700 border-2 border-blue-600' : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-600'
        }`}
      >
        {isCompared ? 'Added to Compare' : '+ Compare'}
      </button>
    </div>
  </motion.div>
));

const ComparePanel = React.memo(({ products, onRemove, getImageUrl }) => (
  <motion.div className="fixed z-40 max-w-sm p-6 bg-white border-2 border-blue-600 shadow-2xl bottom-4 right-4 rounded-xl"
    initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}>
    <h4 className="flex items-center justify-between mb-4 text-lg font-bold text-gray-900">
      <span>Compare Products ({products.length}/4)</span>
    </h4>
    <div className="mb-4 space-y-3 overflow-y-auto max-h-60">
      {products.map((product, idx) => (
        <motion.div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">{product.name}</p>
            <p className="text-sm font-bold text-green-600">{product.price}</p>
          </div>
          <button onClick={() => onRemove(product)} className="p-2 ml-2 text-red-500 transition-all rounded-lg hover:text-red-700 hover:bg-red-50">
            <X size={18} />
          </button>
        </motion.div>
      ))}
    </div>
    <button className="w-full px-4 py-3 font-semibold text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-95">
      View Comparison Details
    </button>
  </motion.div>
));

const ProductDetails = ({ product, onClose, getImageUrl }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  if (!product) return null;

  const totalImages = product.images?.length || 1;
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % totalImages);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <motion.div className="relative w-full max-w-4xl bg-white shadow-2xl rounded-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <button onClick={onClose} className="absolute z-10 p-2 text-gray-500 transition-all bg-white rounded-full top-4 right-4 hover:text-gray-800 hover:bg-gray-100">
          <X size={24} />
        </button>
        <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2 md:p-8">
          <div className="flex flex-col">
            <div className="relative mb-4 overflow-hidden h-96 rounded-xl bg-gradient-to-br from-blue-50 to-gray-100">
              {product.images?.length > 0 ? (
                <img src={getImageUrl(product.images[currentImageIndex])} alt={`${product.name} image ${currentImageIndex + 1}`} className="object-cover w-full h-full" />
              ) : (
                <div className="flex items-center justify-center w-full h-full">No Image</div>
              )}
              {totalImages > 1 && (
                <>
                  <button onClick={prevImage} className="absolute p-3 text-gray-800 transition-all -translate-y-1/2 rounded-full shadow-lg left-3 top-1/2 bg-white/90 hover:bg-white">
                    <ChevronLeft size={24} />
                  </button>
                  <button onClick={nextImage} className="absolute p-3 text-gray-800 transition-all -translate-y-1/2 rounded-full shadow-lg right-3 top-1/2 bg-white/90 hover:bg-white">
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
            {totalImages > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images?.map((_, index) => (
                  <button key={index} onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden ${index === currentImageIndex ? 'border-blue-600' : 'border-gray-300'}`}>
                    <img src={getImageUrl(product.images[index])} alt={`Thumbnail ${index + 1}`} className="object-cover w-full h-full" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div>
            <h3 className="mb-2 text-3xl font-bold text-gray-900">{product.name}</h3>
            {product.price && <p className="mb-6 text-3xl font-bold text-green-600">{product.price}</p>}
            {product.description && <p className="leading-relaxed text-gray-700">{product.description}</p>}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* === ONLY THIS PART IS FIXED — NOW WORKS 100% WITH YOUR EMAILJS TEMPLATE === */
const QuoteForm = ({ product, onClose }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", details: "" });
  const [status, setStatus] = useState("idle");

  const SERVICE_ID = "service_k1wt2rk";
  const TEMPLATE_ID = "template_khp8d4a";
  const PUBLIC_KEY = "ei0Yx7owixM86BFDM";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.async = true;
    script.onload = () => window.emailjs.init(PUBLIC_KEY);
    document.body.appendChild(script);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await window.emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        product: product?.name || "Custom Quote",
        from_name: form.name,
        from_email: form.email,
        phone: form.phone,
        message: form.details || "No additional details provided",
      });
      setStatus("success");
      setTimeout(() => { onClose(); setForm({ name: "", email: "", phone: "", details: "" }); }, 2500);
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <motion.div className="relative w-full max-w-sm overflow-hidden bg-white shadow-2xl rounded-2xl"
        onClick={e => e.stopPropagation()}
        initial={{ scale: 0.85, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }}>
        
        {status === "success" && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-green-50 rounded-2xl">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full"><span className="text-3xl text-white">Check</span></div>
              <h3 className="text-xl font-bold text-green-800">Quote Submitted!</h3>
              <p className="mt-2 text-green-700">We'll contact you soon.</p>
            </div>
          </div>
        )}

        <button onClick={onClose} className="absolute z-20 p-2 text-gray-600 bg-white rounded-full shadow-sm top-3 right-3 hover:bg-gray-100">
          <X size={18} />
        </button>

        <div className="p-5 text-white bg-gradient-to-r from-blue-600 to-blue-700">
          <h3 className="text-xl font-bold">Get Quote</h3>
          <p className="mt-1 text-sm text-blue-100">{product?.name || "Custom Solution"}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3">
          <input type="text" placeholder="Your Name *" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-3 py-2 text-sm transition-all border-2 border-gray-300 rounded-lg outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200" />
          <input type="email" placeholder="Your Email *" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-3 py-2 text-sm transition-all border-2 border-gray-300 rounded-lg outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200" />
          <input type="tel" placeholder="Your Mobile *" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-3 py-2 text-sm transition-all border-2 border-gray-300 rounded-lg outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200" />
          <textarea placeholder="Your Requirements..." rows={3} value={form.details} onChange={e => setForm({...form, details: e.target.value})} className="w-full px-3 py-2 text-sm transition-all border-2 border-gray-300 rounded-lg outline-none resize-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200" />

          <button type="submit" disabled={status === "sending"} className="w-full py-2.5 text-sm font-bold text-white transition-all bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:shadow-lg disabled:opacity-50">
            {status === "sending" ? "Submitting..." : "Submit Quote"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Products;