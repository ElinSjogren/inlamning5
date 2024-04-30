import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Importera ikoner från Font Awesome

function shareEvent(url, artist, date, city) {
    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&title=${encodeURIComponent(artist)}&date=${encodeURIComponent(date)}&city=${encodeURIComponent(city)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`Check out this event: ${artist} - Date: ${date} - City: ${city}`)}`,
      instagram: 'https://example.com/instagram-share', 
    };
}

function MediaLinks({ event }) {
    const baseUrl = 'https://quantumevents.com';
    const shareUrl = `${baseUrl}/event/${event.id}`;
    const shareLinks = shareEvent(shareUrl, event.artist, event.date, event.city);

    const handleShare = (platform) => {
        window.open(shareLinks[platform], '_blank');
    };

    return (
        <div>
            <button onClick={() => handleShare('facebook')} className="icon-button"><FaFacebook size="2rem" /></button>&nbsp;&nbsp;
            <button onClick={() => handleShare('twitter')} className="icon-button"><FaTwitter size="2rem" /></button>&nbsp;&nbsp;
            <button onClick={() => handleShare('instagram')} className="icon-button"><FaInstagram size="2rem" /></button>
        </div>
    );
}

export default MediaLinks;

