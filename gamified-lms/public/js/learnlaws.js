document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab');
    const tabContent = document.querySelectorAll('.tab-pane');

    // Show the first tab by default
    document.querySelector('#rights').style.display = 'block';
    tabs[0].classList.add('active');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const targetTab = this.getAttribute('data-tab');

            // Hide all tab content
            tabContent.forEach(content => {
                content.style.display = 'none';
            });

            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));

            // Show the clicked tab's content and mark as active
            document.getElementById(targetTab).style.display = 'block';
            this.classList.add('active');
        });
    });
});
