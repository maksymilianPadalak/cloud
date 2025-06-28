export const calculateGainValue = (value: number): number => {
  if (value === 0) {
    return 0
  } else if (value < 5.5) {
    return value / 5.5
  } else {
    return (value / 11) * 5
  }
}

//TODO: Adjust master volume so it can be louder
export const calculateMasterValue = (value: number): number => {
  if (value === 0) {
    return 0
  } else if (value <= 11) {
    return value / 11
  } else {
    return 1
  }
}

export const calculateEQValue = (value: number): number => {
  if (value === 0) {
    return -40
  } else if (value < 5.5) {
    return (value - 5.5) * 4
  } else if (value > 5.5) {
    return (value - 5.5) * 2
  } else {
    return 0
  }
}
