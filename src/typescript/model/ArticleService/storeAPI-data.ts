/* eslint-disable no-unused-vars */
export default function storeData(key: string, dataArray: any) {
  const item = JSON.stringify(dataArray);
  sessionStorage.setItem(key, item);
}

export enum subjects {
  ASTRONOMY = 'astronomy',
  QUANTUM_COMPUTING = 'quantum-computing',
  ASTROBIOLOGY = 'astrobiology',
  BLACKHOLES = 'black-holes',
  CERN = 'cern',
  DARKENERGY = 'dark-energy',
  DARKMATTER = 'dark-matter',
  EXOPLANETS = 'exoplanets',
  GALAXIES = 'galaxies',
  GRAVITY = 'gravity',
  METEORS = 'meteors',
  QUANTUM_PHYSICS = 'quantum-physics',
  SETI = 'seti',
  ARTIFICIAL_INTELLIGENCE = 'artificial-intelligence',
}
