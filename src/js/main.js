function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}
let id1 = document.getElementById('880RR').id
let id2 = document.getElementById('985RF').id
let id3 = document.getElementById('344YJ').id
let id4 = document.getElementById('985PR').id

console.log(id1, id2, id3, id4)

document
  .getElementById(id1)
  .addEventListener('click', () => setLocalStorage('currPageId', id1))
document
  .getElementById(id2)
  .addEventListener('click', () => setLocalStorage('currPageId', id2))
document
  .getElementById(id3)
  .addEventListener('click', () => setLocalStorage('currPageId', id3))
document
  .getElementById(id4)
  .addEventListener('click', () => setLocalStorage('currPageId', id4))
