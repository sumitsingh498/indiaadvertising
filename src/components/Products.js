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

  // No backend fetch in pure frontend app - use local JSON
  useEffect(() => {
    setData(localData);
    setLoading(false);
  }, []);

  // Filter out any null subProducts (defense in depth) - always compute
  const categories = useMemo(() => 
    data?.categories?.map(cat => ({
      ...cat,
      subProducts: (cat.subProducts || []).filter(prod => prod != null)
    })) || [], [data]
  );

  const { description = "" } = data?.companyInfo || {};
  const products = useMemo(() => categories, [categories]);

  // Helper to get full image URL - always compute
  const getImageUrl = useCallback((img) => {
    if (!img) return null;
    if (img.startsWith("http") || img.startsWith("/")) return img;
    // Some data references use `uploads/...` but images are stored in public/images/
    let p = img;
    if (p.startsWith("uploads/")) p = p.replace(/^uploads\//, "images/");
    const base = process.env.PUBLIC_URL || "";
    return `${base}/${p}`;
  }, []);

  // Scroll buttons
  const scroll = useCallback((direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  }, []);

  // Filter logic for search (only for category buttons)
  const filteredProducts = useMemo(() => 
    products.filter((p) =>
      p.category?.toLowerCase().includes(searchTerm.toLowerCase())
    ), [products, searchTerm]
  );

  // Unique categories from filtered products
  const categoriesList = useMemo(() => 
    [...new Set(filteredProducts.map(p => p.category))], [filteredProducts]
  );

  // Show all categories (removed slice limitation)
  const featuredCategories = useMemo(() => 
    categoriesList, [categoriesList]
  );

  // Sub products for active category - Show ALL products
  const activeSubProducts = useMemo(() => {
    if (!activeCategory) return [];
    return products.find((p) => p.category === activeCategory)?.subProducts || [];
  }, [products, activeCategory]);

  // Add product to compare list
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

  // When user clicks "Get Quote"
  const handleQuote = useCallback((product) => {
    setSelectedProduct(product);
    setShowForm(true);
  }, []);

  // When user clicks "Product Details"
  const handleDetails = useCallback((product) => {
    setSelectedForDetails(product);
    setShowDetails(true);
  }, []);

  // For custom solution enquiry
  const handleCustomQuote = useCallback(() => {
    setSelectedProduct({ name: "Custom Solution" });
    setShowForm(true);
  }, []);

  // When clicking "View All Products" in featured categories
  const handleViewAllProducts = useCallback((category) => {
    setActiveCategory(category);
    // Scroll to products section
    setTimeout(() => {
      const productsGrid = document.getElementById('products-grid');
      if (productsGrid) {
        productsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }, []);

  // Early returns after all hooks
  if (loading) return <div className="py-12 text-center">Loading products...</div>;
  if (!data || data.error) return <div className="py-12 text-center">No data available. {data?.error && `Error: ${data.error}`}</div>;

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

        {/* Search and Categories Header */}
        <div className="flex items-center gap-4 mb-8">
          {/* Search Categories - Left Side */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={20} />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 pl-10 pr-4 transition-all border-2 border-gray-300 rounded-lg outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                aria-label="Search categories"
              />
            </div>
          </div>

          {/* Reset Button - Right Side */}
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

        {/* Categories Scroll (Our Range) */}
        <div className="relative mb-10" role="navigation" aria-label="Product categories">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 p-2 text-blue-600 -translate-y-1/2 rounded-full top-1/2 scroll-arrow hover:bg-blue-100"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-3 px-10 overflow-x-auto products-scroll no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <motion.button
              onClick={() => {
                setActiveCategory(null);
              }}
              className={`px-6 py-3 rounded-full font-semibold transition flex-shrink-0 focus:ring-2 focus:ring-offset-1 focus:ring-blue-300 focus:outline-none ${
                !activeCategory
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-700 border border-blue-300"
              }`}
              whileHover={{ scale: 1.05 }}
              aria-pressed={!activeCategory}
            >
              All Categories
            </motion.button>

            {categoriesList.map((category, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setActiveCategory(category);
                }}
                className={`px-6 py-3 rounded-full font-semibold transition flex-shrink-0 focus:ring-2 focus:ring-offset-1 focus:ring-blue-300 focus:outline-none ${
                  activeCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-700 border border-blue-300"
                }`}
                whileHover={{ scale: 1.05 }}
                aria-pressed={activeCategory === category}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 p-2 text-blue-600 -translate-y-1/2 rounded-full top-1/2 scroll-arrow hover:bg-blue-100"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Featured Categories or Sub Products */}
        <motion.div
          id="products-grid"
          className="grid gap-6 lg:grid-cols-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {!activeCategory ? (
            // Featured Categories View - Show ALL categories
            featuredCategories.length === 0 ? (
              <div className="py-8 text-center col-span-full" role="alert" aria-live="polite">
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
            // Sub Products Grid View - Show ALL sub-products but only name and price (no specs)
            activeSubProducts.length === 0 ? (
              <div className="py-8 text-center col-span-full" role="alert" aria-live="polite">
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

        {/* Compare Products Panel */}
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
            aria-label="Enquire for custom solutions"
          >
            Enquire for Custom Solutions
          </button>
        </div>
      </div>

      {/* Quote Modal */}
      {showForm && (
        <QuoteForm
          product={selectedProduct}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Product Details Modal */}
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

// Featured Category Card
const FeaturedCategoryCard = React.memo(({ category, subProducts, imageSrc, onViewAll }) => (
  <motion.div
    className="flex flex-col overflow-hidden transition-all bg-white border border-gray-200 shadow-lg rounded-xl hover:shadow-2xl"
    whileHover={{ y: -8 }}
    role="article"
    aria-labelledby={`${category.replace(/\s+/g, '-').toLowerCase()}-title`}
  >
    <div className="relative flex-shrink-0 h-48 mb-4 overflow-hidden rounded-t-xl bg-gradient-to-br from-blue-50 to-gray-100">
      {imageSrc ? (
          <img 
            src={imageSrc} 
            alt={`${category} example`} 
            className="object-cover w-full h-full transition-transform duration-500 hover:scale-110" 
            loading="lazy"
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
      <h3 id={`${category.replace(/\s+/g, '-').toLowerCase()}-title`} className="mb-3 text-xl font-bold text-gray-900">{category}</h3>
      
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
      <button
        onClick={onViewAll}
        className="self-start px-4 py-2 font-medium text-blue-600 transition-all border border-blue-300 rounded-lg hover:bg-blue-50 hover:border-blue-600 focus:ring-2 focus:ring-blue-300"
        aria-label={`View all in ${category}`}
      >
        View All Products →
      </button>
    </div>
  </motion.div>
));

FeaturedCategoryCard.displayName = 'FeaturedCategoryCard';

// Product Card
const ProductCard = React.memo(({ name, price, images = [], description, specs = [], additionalInfo = {}, onQuote, onDetails, onCompare, isCompared, getImageUrl, showSpecs = true }) => (
  <motion.div
    className="flex flex-col p-6 transition-all bg-white border border-gray-200 shadow-lg rounded-xl hover:shadow-2xl"
    whileHover={{ y: -8 }}
    role="article"
    aria-labelledby={`${name.replace(/\s+/g, '-').toLowerCase()}-title`}
  >
    <div className="relative flex-shrink-0 h-48 mb-4 overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 to-gray-100">
      {images?.[0] ? (
        <>
          <img 
            src={getImageUrl(images[0])} 
            alt={`${name} preview`} 
            className="object-cover w-full h-full transition-transform duration-500 hover:scale-110" 
            loading="lazy"
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

    <h3 id={`${name.replace(/\s+/g, '-').toLowerCase()}-title`} className="flex-shrink-0 mb-2 text-lg font-bold text-gray-900">{name}</h3>
    
    {price && (
      <p className="flex-shrink-0 mb-3 text-xl font-bold text-green-600">{price}</p>
    )}

    {description && (
      <p className="flex-shrink-0 mb-4 text-sm leading-relaxed text-gray-600 line-clamp-2">
        {description}
      </p>
    )}

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
        <button
          onClick={onQuote}
          className="flex-1 px-4 py-3 font-semibold text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 active:scale-95"
          aria-label={`Get quote for ${name}`}
        >
          Get Quote
        </button>
        <button
          onClick={onDetails}
          className="flex-1 px-4 py-3 font-semibold text-gray-700 transition-all bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-300 active:scale-95"
          aria-label={`View details for ${name}`}
        >
          Details
        </button>
      </div>
      <button
        onClick={onCompare}
        className={`w-full px-4 py-2 font-semibold rounded-lg transition-all ${
          isCompared
            ? 'bg-blue-100 text-blue-700 border-2 border-blue-600'
            : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-600'
        }`}
        aria-label={`${isCompared ? 'Remove from' : 'Add to'} comparison`}
      >
        {isCompared ? '✓ Added to Compare' : '+ Compare'}
      </button>
    </div>
  </motion.div>
));

ProductCard.displayName = 'ProductCard';

// Compare Products Panel
const ComparePanel = React.memo(({ products, onRemove, getImageUrl }) => (
  <motion.div
    className="fixed z-40 max-w-sm p-6 bg-white border-2 border-blue-600 shadow-2xl bottom-4 right-4 rounded-xl"
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: 100, opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <h4 className="flex items-center justify-between mb-4 text-lg font-bold text-gray-900">
      <span>Compare Products ({products.length}/4)</span>
      <span className="text-sm text-gray-500">Comparing</span>
    </h4>
    
    <div className="mb-4 space-y-3 overflow-y-auto max-h-60">
      {products.map((product, idx) => (
        <motion.div
          key={idx}
          className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
        >
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">{product.name}</p>
            <p className="text-sm font-bold text-green-600">{product.price}</p>
          </div>
          <button
            onClick={() => onRemove(product)}
            className="p-2 ml-2 text-red-500 transition-all rounded-lg hover:text-red-700 hover:bg-red-50"
            aria-label={`Remove ${product.name} from comparison`}
          >
            <X size={18} />
          </button>
        </motion.div>
      ))}
    </div>

    <button
      className="w-full px-4 py-3 font-semibold text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-95"
      aria-label="View detailed comparison"
    >
      View Comparison Details
    </button>
  </motion.div>
));

ComparePanel.displayName = 'ComparePanel';

// Product Details Modal
const ProductDetails = ({ product, onClose, getImageUrl }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  if (!product) return null;

  const totalImages = product.images?.length || 1;
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % totalImages);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  const goToImage = (index) => setCurrentImageIndex(index);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" role="dialog" aria-modal="true" aria-labelledby="details-title">
      <motion.div
        className="relative w-full max-w-4xl bg-white shadow-2xl rounded-2xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <button 
          onClick={onClose} 
          className="absolute z-10 p-2 text-gray-500 transition-all bg-white rounded-full top-4 right-4 hover:text-gray-800 focus:ring-2 focus:ring-gray-300 hover:bg-gray-100"
          aria-label="Close details"
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2 md:p-8">
          {/* Image Gallery */}
          <div className="flex flex-col">
            <div className="relative mb-4 overflow-hidden h-96 rounded-xl bg-gradient-to-br from-blue-50 to-gray-100">
              {product.images?.length > 0 ? (
                <motion.img 
                  key={currentImageIndex}
                  src={getImageUrl(product.images[currentImageIndex])} 
                  alt={`${product.name} image ${currentImageIndex + 1}`} 
                  className="object-cover w-full h-full" 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  loading="lazy"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-50 to-gray-100 rounded-xl">
                  <span className="font-medium text-gray-500">Product Preview</span>
                </div>
              )}
              {totalImages > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute p-3 text-gray-800 transition-all -translate-y-1/2 rounded-full shadow-lg left-3 top-1/2 bg-white/90 hover:bg-white hover:scale-110"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute p-3 text-gray-800 transition-all -translate-y-1/2 rounded-full shadow-lg right-3 top-1/2 bg-white/90 hover:bg-white hover:scale-110"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {totalImages > 1 && (
              <>
                <div className="flex gap-2 overflow-x-auto">
                  {product.images?.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${
                        index === currentImageIndex ? 'border-blue-600 scale-105' : 'border-gray-300'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    >
                      <img
                        src={getImageUrl(product.images[index])}
                        alt={`Thumbnail ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-sm text-center text-gray-500">
                  {currentImageIndex + 1} / {totalImages}
                </p>
              </>
            )}
          </div>

          {/* Product Information */}
          <div>
            <h3 id="details-title" className="mb-2 text-3xl font-bold text-gray-900">{product.name}</h3>
            
            {product.price && (
              <p className="mb-6 text-3xl font-bold text-green-600">{product.price}</p>
            )}

            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-gray-600">(47 reviews)</span>
            </div>

            {product.description && (
              <div className="mb-6">
                <h4 className="mb-3 text-lg font-bold text-gray-900">Description:</h4>
                <p className="leading-relaxed text-gray-700">{product.description}</p>
              </div>
            )}
            
            {product.specs?.length > 0 && (
              <div className="mb-6">
                <h4 className="mb-3 text-lg font-bold text-gray-900">Specifications:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {product.specs.map((spec, idx) => (
                    <li key={idx} className="flex p-3 rounded-lg bg-gray-50">
                      <strong className="text-gray-900 min-w-32">{spec.key}:</strong>
                      <span className="text-gray-700">{spec.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {Object.keys(product.additionalInfo || {}).length > 0 && (
              <div className="mb-6">
                <h4 className="mb-3 text-lg font-bold text-gray-900">Additional Info:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {Object.entries(product.additionalInfo).map(([key, value]) => (
                    <li key={key} className="flex p-3 rounded-lg bg-gray-50">
                      <strong className="text-gray-900 min-w-32">{key}:</strong>
                      <span className="text-gray-700">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-3 pt-6 border-t">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 font-semibold text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-95"
              >
                Get Quote
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 font-semibold text-gray-900 transition-all bg-gray-200 rounded-lg hover:bg-gray-300 active:scale-95"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Quote Form Modal
const QuoteForm = ({ product, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  // EmailJS constants (client-side). Configure these via .env.local (not committed).
  const EMAILJS_KEY = process.env.REACT_APP_EMAILJS_KEY || "YOUR_EMAILJS_PUBLIC_KEY_HERE";
  const EMAILJS_SERVICE = process.env.REACT_APP_EMAILJS_SERVICE || "service_indiaadv";
  const EMAILJS_TEMPLATE = process.env.REACT_APP_EMAILJS_TEMPLATE || "template_indiaadv";
  const CONTACT_EMAIL = process.env.REACT_APP_CONTACT_EMAIL || "indiaadvertising05@gmail.com";

  // Load EmailJS SDK dynamically if needed and initialize
  const loadEmailJs = () => new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve();
    if (window.emailjs) return resolve();
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/index.min.js';
    script.async = true;
    script.onload = () => {
      try {
        if (window.emailjs && EMAILJS_KEY && EMAILJS_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY_HERE') {
          window.emailjs.init(EMAILJS_KEY);
        }
      } catch (err) {
        console.warn('EmailJS init error:', err);
      }
      resolve();
    };
    script.onerror = () => resolve();
    document.body.appendChild(script);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      // Try to send via EmailJS if configured (pure frontend - no backend required)
      await loadEmailJs();

      if (window.emailjs && EMAILJS_KEY && EMAILJS_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY_HERE') {
        await window.emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
          product: product?.name,
          name: form.name,
          email: form.email,
          mobile: form.phone,
          message: form.details,
          to_email: CONTACT_EMAIL,
        });
      } else {
        // Not configured: keep demo behavior and log data to console
        console.info('EmailJS not configured - falling back to demo log.');
        console.log('Quote request (frontend demo):', {
          product: product?.name,
          name: form.name,
          email: form.email,
          mobile: form.phone,
          message: form.details,
          to_email: CONTACT_EMAIL,
        });
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError(err?.message || 'Failed to submit quote');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = useCallback((field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  }, [form]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" role="dialog" aria-modal="true" aria-labelledby="quote-title">
      <motion.div
        className="relative w-full max-w-sm overflow-hidden bg-white shadow-2xl rounded-2xl"
        initial={{ scale: 0.85, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 50 }}
        transition={{ duration: 0.2 }}
      >
        {/* Close button for Quote modal (adds ability to dismiss) */}
        <button
          onClick={onClose}
          className="absolute z-20 p-2 text-gray-600 bg-white rounded-full shadow-sm top-3 right-3 hover:bg-gray-100"
          aria-label="Close quote form"
        >
          <X size={18} />
        </button>
        {success && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center bg-green-50 rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full">
                <span className="text-3xl text-white">✓</span>
              </div>
              <h3 className="text-xl font-bold text-green-800">Quote Submitted!</h3>
              <p className="mt-2 text-green-700">We'll contact you soon.</p>
            </div>
          </motion.div>
        )}

        <div className="p-5 text-white bg-gradient-to-r from-blue-600 to-blue-700">
          <h3 id="quote-title" className="text-xl font-bold">
            Get Quote
          </h3>
          <p className="mt-1 text-sm text-blue-100">{product.name}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3">
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Name *</label>
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange('name')}
              required
              className="w-full px-3 py-2 text-sm transition-all border-2 border-gray-300 rounded-lg outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
              aria-label="Your name"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Email *</label>
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange('email')}
              required
              className="w-full px-3 py-2 text-sm transition-all border-2 border-gray-300 rounded-lg outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
              aria-label="Your email"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Mobile *</label>
            <input
              type="tel"
              placeholder="Your Mobile"
              value={form.phone}
              onChange={handleChange('phone')}
              required
              className="w-full px-3 py-2 text-sm transition-all border-2 border-gray-300 rounded-lg outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
              aria-label="Mobile number"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Details *</label>
            <textarea
              placeholder="Your Requirements..."
              value={form.details}
              onChange={handleChange('details')}
              rows={3}
              className="w-full px-3 py-2 text-sm transition-all border-2 border-gray-300 rounded-lg outline-none resize-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
              aria-label="Work details"
            />
          </div>

          {error && (
            <motion.div
              className="p-4 text-red-700 border-l-4 border-red-500 rounded bg-red-50"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <p className="font-semibold">Error: {error}</p>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 text-sm font-bold text-white transition-all bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            aria-label="Submit quote request"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <span className="mr-2 animate-spin">⏳</span>
                Submitting...
              </span>
            ) : (
              'Submit Quote'
            )}
          </button>

          <p className="text-xs text-center text-gray-500">
            We'll respond within 24 hours.
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Products;