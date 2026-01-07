import {useEffect, useState, useRef} from "react";
import {Link, useNavigate} from "react-router-dom";
import axiosClient from "../api/axiosClient";
import "./css/MainMenu.css";

const IconSearch = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
         strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

const IconHome = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
);

const IconClose = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round"
         strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

interface CategoryRaw {
    _id: string;
    name: string;
    slug: string;
    parent: string | null;
}

interface CategoryTree extends CategoryRaw {
    children: CategoryTree[];
}

export default function MainMenu() {
    const [categories, setCategories] = useState<CategoryTree[]>([]);
    const [showSearch, setShowSearch] = useState(false);
    const [keyword, setKeyword] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const formatName = (slugOrName: string) => {
        if (!slugOrName) return "";
        if (slugOrName.includes(' ') || /[áàảãạăắằẳẵặ.]/.test(slugOrName)) {
            return slugOrName;
        }
        return slugOrName.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    useEffect(() => {
        const buildCategoryTree = (items: CategoryRaw[]): CategoryTree[] => {
            const tree: CategoryTree[] = [];
            const map: { [key: string]: CategoryTree } = {};
            items.forEach(item => {
                map[item._id] = {...item, children: []};
            });
            items.forEach(item => {
                if (item.parent && map[item.parent]) map[item.parent].children.push(map[item._id]);
                else tree.push(map[item._id]);
            });
            return tree;
        };
        const fetchData = async () => {
            try {
                const response = await axiosClient.get('/categories');
                const rawData = response as unknown as CategoryRaw[];
                setCategories(buildCategoryTree(rawData));
            } catch (error) {
                console.error("Lỗi tải menu:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (showSearch && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showSearch]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
            setShowSearch(false);
            setKeyword("");
        }
    };

    return (
        <nav className="menu-container">
            <ul className="main-menu">
                <li className="menu-item home-btn">
                    <Link to="/" aria-label="Trang chủ"><IconHome/></Link>
                </li>

                {categories.map(cat => (
                    <li key={cat._id} className="menu-item">
                        <Link to={`/${cat.slug}`}>{formatName(cat.name)}</Link>
                        {cat.children.length > 0 && (
                            <ul className="sub-menu">
                                {cat.children.map(sub => (
                                    <li key={sub._id}><Link to={`/${sub.slug}`}>{formatName(sub.name)}</Link></li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}

                <li className="menu-item">
                    <Link to="/multimedia" style={{ color: '#d0021b', fontWeight: 'bold' }}>
                        MULTIMEDIA
                    </Link>
                </li>

                <li className="search-area">
                    <form
                        className={`search-expandable ${showSearch ? "active" : ""}`}
                        onSubmit={handleSearchSubmit}
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onBlur={() => !keyword && setShowSearch(false)}
                        />
                        {showSearch && (
                            <span className="search-close-small" onClick={() => {
                                setShowSearch(false);
                                setKeyword("");
                            }}>
                                <IconClose/>
                            </span>
                        )}
                    </form>
                    <div className="search-trigger" onClick={() => setShowSearch(!showSearch)}>
                        <IconSearch/>
                    </div>
                </li>
            </ul>
        </nav>
    );
}