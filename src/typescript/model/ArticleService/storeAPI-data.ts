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
  CERN = 'cern-lhc',
  DARKENERGY = 'dark-energy',
  DARKMATTER = 'dark-matter',
  EXOPLANETS = 'exoplanets',
  GALAXIES = 'galaxies-science',
  GRAVITY = 'gravity-science',
  METEORS = 'meteors-science',
  QUANTUM_PHYSICS = 'quantum-physics',
  SETI = 'seti',
  ARTIFICIAL_INTELLIGENCE = 'AI',
}
