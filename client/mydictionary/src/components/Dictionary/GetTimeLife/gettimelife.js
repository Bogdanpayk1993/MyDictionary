function GetTimeLife(date) {
    let postDate = new Date(date)
    let todayDate = new Date

    let timeLifeWord = todayDate - postDate

    let years = Math.floor(timeLifeWord / (12 * 30 * 24 * 60 * 60 * 1000))
    if (years != 0) {
        if (years == 1) {
            return `${years} year ago`
        } else {
            return `${years} years ago`
        }
    }

    let months = Math.floor(timeLifeWord / (30 * 24 * 60 * 60 * 1000))
    if (months != 0) {
        if (months == 1) {
            return `${months} month ago`
        } else {
            return `${months} months ago`
        }
    }

    let days = Math.floor(timeLifeWord / (24 * 60 * 60 * 1000))
    if (days != 0) {
        if (days == 1) {
            return `${days} day ago`
        } else {
            return `${days} days ago`
        }
    }

    let hours = Math.floor(timeLifeWord / (60 * 60 * 1000))
    if (hours != 0) {
        if (hours == 1) {
            return `${hours} hour ago`
        } else {
            return `${hours} hours ago`
        }
    }

    let minutes = Math.floor(timeLifeWord / (60 * 1000))
    if (minutes != 0) {
        if (minutes == 1) {
            return `${minutes} minute ago`
        } else {
            return `${minutes} minutes ago`
        }
    }

    let seconds = Math.floor(timeLifeWord / 1000)
    if (seconds == 1) {
        return `${seconds} second ago` 
    } else {
        return `${seconds} seconds ago`
    }
}

export default GetTimeLife