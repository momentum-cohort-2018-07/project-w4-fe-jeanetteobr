import 'shoelace-css/dist/shoelace.css'
import '/main.css'

import request from 'superagent'

let resultsDiv = document.getElementById('results-div')
let searchForm = document.getElementById('search-form')

searchForm.addEventListener('submit', event => {
  event.preventDefault()

  let searchBar = document.getElementById('search-input')
  let searchTerms = searchBar.value.split(' ').map(searchTerm => searchTerm.trim())
  let userInput = searchTerms.toString().replace(/,/g, '+')

  request.get('https://itunes.apple.com/search?term=' + userInput)
    .then(response => JSON.parse(response.text))
    .then(body => {
      resultsDiv.innerHTML = ' '
      for (let result of body.results) {
        createResultDiv(result)
      }
    })
  searchForm.reset()
})

function createResultDiv (result) {
  if (result.kind === 'song') {
    let outputDiv = document.createElement('div')
    outputDiv.classList.add('col-3')
    outputDiv.innerHTML = `
    <img src='${result.artworkURL100}' alt='${result.collectionName}-album cover'>
    <span class="track-name"><p>${result.trackName}</p></span>
    <span class="artist-name"><p>${result.artistName}</p></span>
    `
    resultsDiv.appendChild(outputDiv)
  }
}
