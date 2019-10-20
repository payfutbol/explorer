module.exports = {
  createErrorString(functionName, error){
    var extraErrorText = "";

    if (error && error.response){
      if (error.response.status)
        extraErrorText += error.response.status + " "
      if (error.response.statusText)
        extraErrorText += error.response.statusText + " | "
      if (error.response.data)
        extraErrorText += error.response.data
    } else {
      extraErrorText = error.toString()
    }

    return new Error("Unable to " + functionName + ": " + extraErrorText)
  }
}