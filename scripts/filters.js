
document.querySelectorAll('.filters button').forEach(btn => {
  btn.addEventListener('click', function() {
    filterBySize(this.id.charAt(0));
  });
});



