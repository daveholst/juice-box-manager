const allTestButtons = document.querySelectorAll('.test-buttons');

allTestButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const { topic, payload } = e.target.dataset
    axios.post('/api/relays', {
      topic,
      payload,
    })
  })
});