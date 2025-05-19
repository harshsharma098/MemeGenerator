// DOM elements
const generateBtn  = document.querySelector('.generate-button');
const memeTitle    = document.querySelector('.meme-title');
const memeImage    = document.querySelector('.meme-image');
const authorOutput = document.querySelector('.author');
const keywordInput = document.querySelector('.keyword-input');

// Show loading state
function showLoading() {
  memeTitle.textContent = 'Loading...';
  memeImage.style.opacity = 0;
  authorOutput.textContent = '';
}

// Update display
function updateMeme({ title, url, author }) {
  memeTitle.textContent = title || 'Untitled';
  memeImage.src = url;
  memeImage.onload = () => (memeImage.style.opacity = 1);
  authorOutput.textContent = author ? `Meme by: ${author}` : '';
}

// Fetch logic
async function getMeme() {
  showLoading();
  const raw   = keywordInput.value.trim().toLowerCase();
  const topic = raw || 'wholesomememes';

  try {
    const res  = await fetch(`https://meme-api.com/gimme/${encodeURIComponent(topic)}`);
    const data = await res.json();

    if (data?.url) {
      updateMeme(data);
    } else {
      memeTitle.textContent = `No memes for “${topic}”`;
      memeImage.src = '';
      authorOutput.textContent = '';
    }
  } catch (e) {
    console.error('Fetch error:', e);
    memeTitle.textContent = 'Error fetching meme.';
    memeImage.src = '';
    authorOutput.textContent = '';
  }
}

// Bind events
generateBtn.addEventListener('click', getMeme);
keywordInput.addEventListener('keyup', e => {
  if (e.key === 'Enter') getMeme();
});

// Initial load
getMeme();
