chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    try {
        if (changeInfo.status === 'complete' && tab.url) {
            console.log(`Tab updated with URL: ${tab.url}`);
            if (tab.url.includes('youtube.com/playlist?') || (tab.url.includes('youtube.com/watch?') && tab.url.includes('&list='))) {
                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ['content.js']
                });
            }
        } else {
            console.warn('Tab URL is undefined or changeInfo status is not complete');
        }
    } catch (error) {
        console.error('Error in event handler:', error);
    }
});
