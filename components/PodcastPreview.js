/**
 * PodcastPreview Custom Web Component
 * 
 * Displays a preview card for a podcast including cover image, title,
 * genres, number of seasons, and the last updated date.
 */
class PodcastPreview extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    /**
     * Getters and Setters for properties
     */
    get image() { return this.getAttribute('image') || ''; }
    set image(val) { this.setAttribute('image', val); }

    get title() { return this.getAttribute('title') || 'Unknown Title'; }
    set title(val) { this.setAttribute('title', val); }

    get genres() { return this.getAttribute('genres') || 'Unknown Genres'; }
    set genres(val) { this.setAttribute('genres', val); }

    get seasons() { return this.getAttribute('seasons') || '0'; }
    set seasons(val) { this.setAttribute('seasons', val); }

    get updated() { return this.getAttribute('updated') || ''; }
    set updated(val) { this.setAttribute('updated', val); }
    
    get podcastId() { return this.getAttribute('podcast-id') || ''; }
    set podcastId(val) { this.setAttribute('podcast-id', val); }

    /**
     * Helper to format the date
     * @param {string} dateString 
     * @returns {string} Formatted date
     */
    formatDate(dateString) {
        if (!dateString) return 'Unknown Date';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Unknown Date';
        
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }).format(date);
    }

    /**
     * Setup event listeners for the component
     */
    setupEventListeners() {
        // Accessibility: allow keyboard interaction
        this.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.fireClickEvent();
            }
        });

        // Click interaction
        this.addEventListener('click', () => {
            this.fireClickEvent();
        });
    }

    /**
     * Dispatches a custom event when the component is clicked
     */
    fireClickEvent() {
        const event = new CustomEvent('preview-click', {
            detail: {
                id: this.podcastId,
                title: this.title
            },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }

    /**
     * Render the component's HTML and CSS
     */
    render() {
        const seasonsText = `${this.seasons} Season${parseInt(this.seasons) !== 1 ? 's' : ''}`;
        const formattedDate = this.formatDate(this.updated);

        this.shadowRoot.innerHTML = \`
            <style>
                :host {
                    display: block;
                    cursor: pointer;
                    background-color: #1e293b;
                    border-radius: 12px;
                    overflow: hidden;
                    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: #f8fafc;
                    font-family: 'Inter', sans-serif;
                }
                :host(:hover), :host(:focus-visible) {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
                    border-color: #60a5fa;
                    outline: none;
                }
                .card-container {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }
                .card-image {
                    width: 100%;
                    aspect-ratio: 1 / 1;
                    object-fit: cover;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    display: block;
                }
                .card-content {
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                }
                .card-title {
                    font-size: 1.25rem;
                    margin: 0 0 0.5rem 0;
                    font-weight: 600;
                    line-height: 1.3;
                }
                .card-meta {
                    font-size: 0.9rem;
                    color: #3b82f6;
                    margin: 0 0 0.5rem 0;
                    font-weight: 500;
                }
                .card-genres {
                    font-size: 0.85rem;
                    color: #94a3b8;
                    margin: 0 0 1rem 0;
                    flex-grow: 1;
                }
                .card-date {
                    font-size: 0.8rem;
                    color: #94a3b8;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    padding-top: 0.75rem;
                    margin: auto 0 0 0;
                }
            </style>

            <div class="card-container" role="button" tabindex="0">
                <img src="\${this.image}" alt="\${this.title} cover" class="card-image" loading="lazy">
                <div class="card-content">
                    <h3 class="card-title">\${this.title}</h3>
                    <p class="card-meta">
                        <span class="seasons-count">\${seasonsText}</span>
                    </p>
                    <p class="card-genres" aria-label="Genres: \${this.genres}">\${this.genres}</p>
                    <p class="card-date">Updated: <time datetime="\${this.updated}">\${formattedDate}</time></p>
                </div>
            </div>
        \`;
    }
}

// Register the custom element
customElements.define('podcast-preview', PodcastPreview);
