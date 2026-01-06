"use client";

import { useState, useEffect } from "react";
import { ProductType } from "@prisma/client";
import axios from "axios";
import "./page.css";

interface ProductVariant {
    id?: number;
    code: string;
    raVolume: string;
    rbVolume: string;
    kitVolume: string;
    instrument: string;
}

interface VariantForm {
    id?: number;
    code: string;
    raVolume: string;
    rbVolume: string;
    kitVolume: string;
    unit: string;
    instrument: string;
}

interface ProductCategory {
    id: number;
    category: string;
    productType: ProductType;
    icon: string;
    products?: Product[];
}

interface Product {
    id: number;
    name: string;
    method: string;
    productType: ProductType;
    createdAt: string;
    variants?: ProductVariant[];
    categories?: ProductCategory[];
}

export default function ProductPage() {
    const [activeTab, setActiveTab] = useState<"products" | "categories">("products");
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [editingCategory, setEditingCategory] = useState<ProductCategory | null>(null);
    const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
    const [filterType, setFilterType] = useState<ProductType | "ALL">("ALL");
    const [filterCategory, setFilterCategory] = useState<number | "ALL">("ALL");
    const [searchQuery, setSearchQuery] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        method: "",
        productType: "CLINICAL" as ProductType,
        category: [] as string[],
        variant: [] as VariantForm[],
    });

    const [categoryFormData, setCategoryFormData] = useState({
        name: "",
        productType: "CLINICAL" as ProductType,
        icon: "",
    });

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const parseVolumeUnit = (volume: string): { value: string; unit: string } => {
        const match = volume.match(/^(.+?)\s*([a-zA-Z]+)$/);
        if (match) {
            return { value: match[1].trim(), unit: match[2].trim() };
        }
        return { value: volume, unit: "mL" };
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/product");
            setProducts(response.data.data || []);
            setError(null);
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Failed to fetch products");
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get("/api/product-category");
            setCategories(response.data.data || []);
        } catch (err) {
            console.error("Failed to fetch categories:", err);
        }
    };

    const openModal = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
            const variantsWithUnit = product.variants?.map((v) => {
                const raData = parseVolumeUnit(v.raVolume);
                const rbData = parseVolumeUnit(v.rbVolume);
                const kitData = parseVolumeUnit(v.kitVolume);
                const unit = raData.unit || rbData.unit || kitData.unit || "mL";

                return {
                    id: v.id,
                    code: v.code,
                    raVolume: raData.value,
                    rbVolume: rbData.value,
                    kitVolume: kitData.value,
                    unit: unit,
                    instrument: v.instrument,
                };
            }) || [];

            setFormData({
                name: product.name,
                method: product.method,
                productType: product.productType,
                category: product.categories?.map((c) => c.category) || [],
                variant: variantsWithUnit,
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: "",
                method: "",
                productType: "CLINICAL",
                category: [],
                variant: [],
            });
        }
        setShowModal(true);
        setIsClosing(false);
    };

    const closeModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setShowModal(false);
            setIsClosing(false);
            setEditingProduct(null);
        }, 300);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const variantsToSubmit = formData.variant.map((v) => ({
                id: v.id,
                code: v.code,
                raVolume: v.raVolume && v.unit ? `${v.raVolume} ${v.unit}` : v.raVolume,
                rbVolume: v.rbVolume && v.unit ? `${v.rbVolume} ${v.unit}` : v.rbVolume,
                kitVolume: v.kitVolume && v.unit ? `${v.kitVolume} ${v.unit}` : v.kitVolume,
                instrument: v.instrument,
            }));

            const dataToSubmit = {
                ...formData,
                variant: variantsToSubmit,
            };

            if (editingProduct) {
                await axios.put(`/api/product/${editingProduct.id}`, dataToSubmit);
            } else {
                await axios.post("/api/product", dataToSubmit);
            }

            await fetchProducts();
            closeModal();
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.data?.message) {
                alert(err.response.data.message);
            } else {
                alert("Failed to save product");
            }
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            await axios.delete(`/api/product/${id}`);
            await fetchProducts();
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.data?.message) {
                alert(err.response.data.message);
            } else {
                alert("Failed to delete product");
            }
        }
    };

    const addVariant = () => {
        setFormData({
            ...formData,
            variant: [
                ...formData.variant,
                { code: "", raVolume: "", rbVolume: "", kitVolume: "", unit: "mL", instrument: "" },
            ],
        });
    };

    const updateVariant = (index: number, field: keyof VariantForm, value: string) => {
        const newVariants = [...formData.variant];
        newVariants[index] = { ...newVariants[index], [field]: value };
        setFormData({ ...formData, variant: newVariants });
    };

    const removeVariant = (index: number) => {
        setFormData({
            ...formData,
            variant: formData.variant.filter((_, i) => i !== index),
        });
    };

    const toggleCategory = (categoryId: string) => {
        const newCategories = formData.category.includes(categoryId)
            ? formData.category.filter((c) => c !== categoryId)
            : [...formData.category, categoryId];
        setFormData({ ...formData, category: newCategories });
    };

    const filteredProducts = products.filter((product) => {
        const typeMatch = filterType === "ALL" || product.productType === filterType;
        const categoryMatch =
            filterCategory === "ALL" ||
            product.categories?.some((c) => c.id === filterCategory);
        const searchMatch = searchQuery === "" ||
            product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return typeMatch && categoryMatch && searchMatch;
    });

    const availableCategories = categories.filter(
        (cat) => filterType === "ALL" || cat.productType === filterType
    );

    const openCategoryModal = (category?: ProductCategory) => {
        if (category) {
            setEditingCategory(category);
            setCategoryFormData({
                name: category.category,
                productType: category.productType,
                icon: category.icon,
            });
        } else {
            setEditingCategory(null);
            setCategoryFormData({
                name: "",
                productType: "CLINICAL",
                icon: "",
            });
        }
        setShowCategoryModal(true);
        setIsClosing(false);
    };

    const closeCategoryModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setShowCategoryModal(false);
            setIsClosing(false);
            setEditingCategory(null);
        }, 300);
    };

    const handleCategorySubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingCategory) {
                await axios.put(`/api/product-category/${editingCategory.id}`, categoryFormData);
            } else {
                await axios.post("/api/product-category", categoryFormData);
            }

            await fetchCategories();
            closeCategoryModal();
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.data?.message) {
                alert(err.response.data.message);
            } else {
                alert("Failed to save category");
            }
        }
    };

    const handleCategoryDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this category?")) return;

        try {
            await axios.delete(`/api/product-category/${id}`);
            await fetchCategories();
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.data?.message) {
                alert(err.response.data.message);
            } else {
                alert("Failed to delete category");
            }
        }
    };

    const filteredCategories = categories.filter((cat) =>
        filterType === "ALL" || cat.productType === filterType
    );

    // Count products per category
    const getProductCountForCategory = (categoryId: number) => {
        return products.filter(product =>
            product.categories?.some(cat => cat.id === categoryId)
        ).length;
    };

    const openDetailModal = (product: Product) => {
        setViewingProduct(product);
        setShowDetailModal(true);
        setIsClosing(false);
    };

    const closeDetailModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setShowDetailModal(false);
            setIsClosing(false);
            setViewingProduct(null);
        }, 300);
    };

    return (
        <div className="products-page">
            <div className="page-header">
                <h1>Product Management</h1>
                <div className="header-actions">
                    {activeTab === "products" ? (
                        <button className="btn-primary" onClick={() => openModal()}>
                            + Add Product
                        </button>
                    ) : (
                        <button className="btn-primary" onClick={() => openCategoryModal()}>
                            + Add Category
                        </button>
                    )}
                </div>
            </div>

            <div className="tabs">
                <button
                    className={`tab ${activeTab === "products" ? "active" : ""}`}
                    onClick={() => setActiveTab("products")}
                >
                    Products
                </button>
                <button
                    className={`tab ${activeTab === "categories" ? "active" : ""}`}
                    onClick={() => setActiveTab("categories")}
                >
                    Categories
                </button>
            </div>

            {activeTab === "products" ? (
                <>
                    <div className="filters">
                        <div className="filter-group">
                            <label>Search:</label>
                            <input
                                type="text"
                                placeholder="Search by product name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    border: '1px solid #dee2e6',
                                    borderRadius: '4px',
                                    fontSize: '0.95rem',
                                    minWidth: '250px',
                                }}
                            />
                        </div>

                        <div className="filter-group">
                            <label>Product Type:</label>
                            <select
                                value={filterType}
                                onChange={(e) => {
                                    setFilterType(e.target.value as ProductType | "ALL");
                                    setFilterCategory("ALL");
                                }}
                            >
                                <option value="ALL">All Types</option>
                                <option value="CLINICAL">Clinical</option>
                                <option value="FOOD_AND_BEVERAGE">Food & Beverage</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Category:</label>
                            <select
                                value={filterCategory}
                                onChange={(e) =>
                                    setFilterCategory(e.target.value === "ALL" ? "ALL" : Number(e.target.value))
                                }
                            >
                                <option value="ALL">All Categories</option>
                                {availableCategories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="loading">Loading...</div>
                    ) : error ? (
                        <div className="error">{error}</div>
                    ) : (
                        <div className="table-wrapper">
                            <table className="products-table">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Name</th>
                                        <th>Method</th>
                                        <th>Type</th>
                                        <th>Categories</th>
                                        <th>Variants</th>
                                        <th>Created</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.map((product, index) => (
                                        <tr key={product.id} className="clickable-row" onClick={() => openDetailModal(product)}>
                                            <td>{index + 1}</td>
                                            <td>{product.name}</td>
                                            <td>{product.method}</td>
                                            <td>
                                                <span className={`badge ${product.productType?.toLowerCase() || 'clinical'}`}>
                                                    {product.productType === "FOOD_AND_BEVERAGE"
                                                        ? "Food & Beverage"
                                                        : "Clinical"}
                                                </span>
                                            </td>
                                            <td>
                                                {product.categories?.map((cat) => (
                                                    <span key={cat.id} className="category-tag">
                                                        {cat.category}
                                                    </span>
                                                ))}
                                            </td>
                                            <td>{product.variants?.length || 0}</td>
                                            <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                                            <td onClick={(e) => e.stopPropagation()}>
                                                <button
                                                    className="btn-edit"
                                                    onClick={() => openModal(product)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => handleDelete(product.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <div className="filters">
                        <div className="filter-group">
                            <label>Product Type:</label>
                            <select
                                value={filterType}
                                onChange={(e) => {
                                    setFilterType(e.target.value as ProductType | "ALL");
                                }}
                            >
                                <option value="ALL">All Types</option>
                                <option value="CLINICAL">Clinical</option>
                                <option value="FOOD_AND_BEVERAGE">Food & Beverage</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="loading">Loading...</div>
                    ) : error ? (
                        <div className="error">{error}</div>
                    ) : (
                        <div className="table-wrapper">
                            <table className="products-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Category Name</th>
                                        <th>Type</th>
                                        <th>Icon</th>
                                        <th>Products Count</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCategories.map((category) => (
                                        <tr key={category.id}>
                                            <td>{category.id}</td>
                                            <td>{category.category}</td>
                                            <td>
                                                <span className={`badge ${category.productType?.toLowerCase() || 'clinical'}`}>
                                                    {category.productType === "FOOD_AND_BEVERAGE"
                                                        ? "Food & Beverage"
                                                        : "Clinical"}
                                                </span>
                                            </td>
                                            <td>{category.icon}</td>
                                            <td>{getProductCountForCategory(category.id)}</td>
                                            <td>
                                                <button
                                                    className="btn-edit"
                                                    onClick={() => openCategoryModal(category)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => handleCategoryDelete(category.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}

            {showModal && (
                <div
                    className={`modal-overlay ${isClosing ? "closing" : ""}`}
                    onClick={closeModal}
                >
                    <div
                        key={editingProduct?.id || 'new'}
                        className={`modal ${isClosing ? "closing" : ""}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-header">
                            <h2>{editingProduct ? "Edit Product" : "Add New Product"}</h2>
                            <button className="modal-close" onClick={closeModal}>
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Product Name *</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Method *</label>
                                    <input
                                        type="text"
                                        value={formData.method}
                                        onChange={(e) =>
                                            setFormData({ ...formData, method: e.target.value })
                                        }
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Product Type *</label>
                                    <select
                                        value={formData.productType}
                                        onChange={(e) => {
                                            const newProductType = e.target.value as ProductType;
                                            setFormData({
                                                ...formData,
                                                productType: newProductType,
                                                category: [],
                                            });
                                        }}
                                        required
                                    >
                                        <option value="CLINICAL">Clinical</option>
                                        <option value="FOOD_AND_BEVERAGE">Food & Beverage</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Categories</label>
                                    {categories.filter((cat) => cat.productType === formData.productType).length === 0 ? (
                                        <p style={{ color: '#9ca3af', fontStyle: 'italic', padding: '1rem', border: '1px dashed #e5e7eb', borderRadius: '4px' }}>
                                            No categories available for {formData.productType === 'FOOD_AND_BEVERAGE' ? 'Food & Beverage' : 'Clinical'}.
                                            Please create a category first.
                                        </p>
                                    ) : (
                                        <div key={formData.productType} className="checkbox-group">
                                            {categories
                                                .filter((cat) => cat.productType === formData.productType)
                                                .map((cat) => (
                                                    <label key={cat.id} className="checkbox-label">
                                                        <input
                                                            key={`${cat.id}-${formData.category.includes(cat.category)}`}
                                                            type="checkbox"
                                                            checked={formData.category.includes(cat.category)}
                                                            onChange={() => toggleCategory(cat.category)}
                                                        />
                                                        {cat.category}
                                                    </label>
                                                ))}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <div className="variants-header">
                                        <label>Variants</label>
                                        <button
                                            type="button"
                                            className="btn-add-variant"
                                            onClick={addVariant}
                                        >
                                            + Add Variant
                                        </button>
                                    </div>

                                    {formData.variant.map((variant, index) => (
                                        <div key={index} className="variant-item">
                                            <div className="variant-grid">
                                                <input
                                                    type="text"
                                                    placeholder="Instrument"
                                                    value={variant.instrument}
                                                    onChange={(e) =>
                                                        updateVariant(index, "instrument", e.target.value)
                                                    }
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Code"
                                                    value={variant.code}
                                                    onChange={(e) =>
                                                        updateVariant(index, "code", e.target.value)
                                                    }
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="RA Volume"
                                                    value={variant.raVolume}
                                                    onChange={(e) =>
                                                        updateVariant(index, "raVolume", e.target.value)
                                                    }
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="RB Volume"
                                                    value={variant.rbVolume}
                                                    onChange={(e) =>
                                                        updateVariant(index, "rbVolume", e.target.value)
                                                    }
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Kit Volume"
                                                    value={variant.kitVolume}
                                                    onChange={(e) =>
                                                        updateVariant(index, "kitVolume", e.target.value)
                                                    }
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Unit (e.g., mL)"
                                                    value={variant.unit}
                                                    onChange={(e) =>
                                                        updateVariant(index, "unit", e.target.value)
                                                    }
                                                />

                                            </div>
                                            <button
                                                type="button"
                                                className="btn-remove-variant"
                                                onClick={() => removeVariant(index)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn-cancel" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-submit">
                                    {editingProduct ? "Update" : "Create"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showCategoryModal && (
                <div
                    className={`modal-overlay ${isClosing ? "closing" : ""}`}
                    onClick={closeCategoryModal}
                >
                    <div
                        className={`modal ${isClosing ? "closing" : ""}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-header">
                            <h2>{editingCategory ? "Edit Category" : "Add New Category"}</h2>
                            <button className="modal-close" onClick={closeCategoryModal}>
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleCategorySubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Category Name *</label>
                                    <input
                                        type="text"
                                        value={categoryFormData.name}
                                        onChange={(e) =>
                                            setCategoryFormData({ ...categoryFormData, name: e.target.value })
                                        }
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Product Type *</label>
                                    <select
                                        value={categoryFormData.productType}
                                        onChange={(e) =>
                                            setCategoryFormData({
                                                ...categoryFormData,
                                                productType: e.target.value as ProductType,
                                            })
                                        }
                                        required
                                    >
                                        <option value="CLINICAL">Clinical</option>
                                        <option value="FOOD_AND_BEVERAGE">Food & Beverage</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Icon (emoji or text) *</label>
                                    <input
                                        type="text"
                                        value={categoryFormData.icon}
                                        onChange={(e) =>
                                            setCategoryFormData({ ...categoryFormData, icon: e.target.value })
                                        }
                                        placeholder="e.g., 🧪 or Icon"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn-cancel" onClick={closeCategoryModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-submit">
                                    {editingCategory ? "Update" : "Create"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showDetailModal && viewingProduct && (
                <div
                    className={`modal-overlay ${isClosing ? "closing" : ""}`}
                    onClick={closeDetailModal}
                >
                    <div
                        className={`modal modal-detail ${isClosing ? "closing" : ""}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-header">
                            <h2>Product Detail</h2>
                            <button className="modal-close" onClick={closeDetailModal}>
                                ×
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="detail-section">
                                <h3>Basic Information</h3>
                                <div className="detail-grid">
                                    <div className="detail-item">
                                        <label>Product ID:</label>
                                        <span>{viewingProduct.id}</span>
                                    </div>
                                    <div className="detail-item">
                                        <label>Product Name:</label>
                                        <span>{viewingProduct.name}</span>
                                    </div>
                                    <div className="detail-item">
                                        <label>Method:</label>
                                        <span>{viewingProduct.method}</span>
                                    </div>
                                    <div className="detail-item">
                                        <label>Product Type:</label>
                                        <span className={`badge ${viewingProduct.productType?.toLowerCase() || 'clinical'}`}>
                                            {viewingProduct.productType === "FOOD_AND_BEVERAGE"
                                                ? "Food & Beverage"
                                                : "Clinical"}
                                        </span>
                                    </div>
                                    <div className="detail-item">
                                        <label>Created At:</label>
                                        <span>{new Date(viewingProduct.createdAt).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="detail-section">
                                <h3>Categories</h3>
                                <div className="categories-list">
                                    {viewingProduct.categories && viewingProduct.categories.length > 0 ? (
                                        viewingProduct.categories.map((cat) => (
                                            <div key={cat.id} className="category-detail-item">

                                                <span className="category-name">{cat.category}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="no-data">No categories assigned</p>
                                    )}
                                </div>
                            </div>

                            <div className="detail-section">
                                <h3>Variants ({viewingProduct.variants?.length || 0})</h3>
                                {viewingProduct.variants && viewingProduct.variants.length > 0 ? (
                                    <div className="variants-table-wrapper">
                                        <table className="variants-detail-table">
                                            <thead>
                                                <tr>
                                                    <th>Instrument</th>
                                                    <th>Code</th>
                                                    <th>RA Volume</th>
                                                    <th>RB Volume</th>
                                                    <th>Kit Volume</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {viewingProduct.variants.map((variant, idx) => (
                                                    <tr key={idx}>
                                                        <td>{variant.instrument}</td>
                                                        <td>{variant.code}</td>
                                                        <td>{variant.raVolume}</td>
                                                        <td>{variant.rbVolume}</td>
                                                        <td>{variant.kitVolume}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <p className="no-data">No variants available</p>
                                )}
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn-primary" onClick={() => {
                                closeDetailModal();
                                openModal(viewingProduct);
                            }}>
                                Edit Product
                            </button>
                            <button className="btn-cancel" onClick={closeDetailModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
