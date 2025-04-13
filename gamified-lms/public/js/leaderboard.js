function randomizeLeaderboard() {
    const leaderboard = document.querySelector('.leaderboard');
  
    setInterval(() => {
      const items = Array.from(document.querySelectorAll('.leaderboard-item'));
  
      // Update points for each item
      items.forEach(item => {
        const currentPoints = parseInt(item.dataset.points);
        const change = Math.floor(Math.random() * 101 - 50); // -50 to +50
        let newPoints = currentPoints + change;
        if (newPoints < 0) newPoints = 0;
        item.dataset.points = newPoints;
        item.dataset.change = change;
      });
  
      // Sort items by new points descending
      const sortedItems = [...items].sort((a, b) => {
        return parseInt(b.dataset.points) - parseInt(a.dataset.points);
      });
  
      leaderboard.innerHTML = '';
  
      // Re-render sorted leaderboard
      sortedItems.forEach((item, index) => {
        const newPoints = parseInt(item.dataset.points);
        const change = parseInt(item.dataset.change);
  
        item.querySelector('.rank').textContent = `${index + 1}.`;
        item.querySelector('.points').textContent = `${newPoints} Points`;
  
        const changeEl = item.querySelector('.point-change');
        if (change > 0) {
          changeEl.textContent = `+${change}`;
          changeEl.className = 'point-change up';
        } else if (change < 0) {
          changeEl.textContent = `${change}`;
          changeEl.className = 'point-change down';
        } else {
          changeEl.textContent = '';
          changeEl.className = 'point-change';
        }
  
        leaderboard.appendChild(item);
      });
    }, 5000);
  }
  
  randomizeLeaderboard();


 