import { Link } from 'react-router-dom';
import '../scss/HotTags.scss';

const HotTag = () => {
    const tags = ['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1', 'UEFA Champions League', 'World Cup', 'Copa America', 'Việt Nam'];

    return (
        <div className="hot-tags-container">
            <div className="tags-header">
                <span className="hash-icon">#</span>
                <h3>Tags hot trend</h3>
            </div>

            <div className="tags-list">
                {tags.map((tag, index) => (
                    <Link 
                        key={index} 
                        to={`/search?keyword=${encodeURIComponent(tag)}`} 
                        className="tag-item"
                    >
                        {tag}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HotTag;