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
    <img src='${result.artworkUrl100}' alt='${result.collectionName}-album cover'>
    <div id="track-name">${result.trackName}</div>
    <div id="artist-name">${result.artistName}</div>
    `
    resultsDiv.appendChild(outputDiv)
  }
}
