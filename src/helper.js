export default class DistrictRepository {
  constructor(schoolData) {
    this.stats = this.fetchData(schoolData)
  }

  fetchData(data) {
    const locations = data.reduce((acc, currentSchool) => {
      if(!acc[currentSchool.Location]) {
        currentSchool = currentSchool.Location.toUpperCase()
        acc[currentSchool] = {
          location: currentSchool,
          stats: {}
        }
      }
      return acc
    }, {})
    Object.keys(locations).forEach(location => {
      data.forEach(year => {
        if(year.Location.toUpperCase() === location && isNaN(year.Data)) {
          locations[location].stats[year.TimeFrame] = 0
        } else if (year.Location.toUpperCase() === location) {
          locations[location].stats[year.TimeFrame] = Math.round(1000 * year.Data) / 1000
        }
      })
    })
    return locations
  }

  findByName(search) {
    let searchResults = undefined
    if(search !== undefined) {
      let upperCaseSearch = search.toUpperCase()
      Object.keys(this.stats).forEach(school => {
        if(school === upperCaseSearch) {
          let upperCaseSchool = school.toUpperCase()
          searchResults = upperCaseSchool
        }
      })
    }
    return this.stats[searchResults]
  }

  findAllMatches(search) {
    let searchResults = []
    if(search !== undefined) {
      const upperCaseSearch = search.toUpperCase()
      Object.keys(this.stats).forEach(school => {
        const oneSchool = school.toUpperCase()
        if(oneSchool.includes(upperCaseSearch)) {
          searchResults.push(school)
        }
      })
    }
    if(!searchResults.length && search === undefined) {
      return Object.keys(this.stats)
    } else {
      return searchResults
    }
  }

  findAverage(school) {
    const values = Object.values(this.stats[school].stats)
    const total = values.reduce((acc, stat) => {
      acc += stat
      return acc
    }, 0)
    return Math.round(1000 * total / values.length) / 1000
  }

  compareDistrictAverages(schoolOne, schoolTwo) {
    const firstSchool = schoolOne.toUpperCase(); 
    const secondSchool = schoolTwo.toUpperCase()  
    let comparedSchools = {
      [firstSchool]: this.findAverage(firstSchool),
      [secondSchool]: this.findAverage(secondSchool),
      'compared': 0
    }
    comparedSchools.compared = Math.round(1000 * comparedSchools[firstSchool] / comparedSchools[secondSchool]) / 1000
    return comparedSchools
  }
}