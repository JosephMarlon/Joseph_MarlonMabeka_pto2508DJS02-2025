import { podcasts, genres } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const podcastGrid = document.getElementById('podcast-grid');
    const modal = document.getElementById('demo-modal');
    const overlay = document.getElementById('demo-modal-overlay');
    const closeBtn = document.getElementById('close-modal');
    const modalTitle = document.getElementById('demo-modal-title');
    const modalId = document.getElementById('demo-modal-id');

    // Helper to get genre names from IDs
    const getGenreNames = (genreIds) => {
        return genreIds.map(id => {
            const genre = genres.find(g => g.id === id);
            return genre ? genre.title : 'Unknown';
        }).join(', ');
    };

    // Render the podcast web components
    podcasts.forEach(podcastData => {
        // Create the custom element
        const podcastComponent = document.createElement('podcast-preview');
        
        // Set properties
        podcastComponent.image = podcastData.image;
        podcastComponent.title = podcastData.title;
        podcastComponent.genres = getGenreNames(podcastData.genres);
        podcastComponent.seasons = podcastData.seasons;
        podcastComponent.updated = podcastData.updated;
        podcastComponent.podcastId = podcastData.id;

        // Append to grid
        podcastGrid.appendChild(podcastComponent);
    });

    // Listen for custom interaction events from the components
    document.addEventListener('preview-click', (event) => {
        const { id, title } = event.detail;
        
        // Populate and show the modal
        modalTitle.textContent = title;
        modalId.textContent = id;
        
        modal.classList.add('show');
        overlay.classList.add('show');
    });

    // Modal close logic
    const closeModal = () => {
        modal.classList.remove('show');
        overlay.classList.remove('show');
    };

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
});
