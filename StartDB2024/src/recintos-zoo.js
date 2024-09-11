class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: "savana", tamanho: 10, animais: [{ especie: "MACACO", quantidade: 3 }] },
        { numero: 2, bioma: "floresta", tamanho: 5, animais: [] },
        { numero: 3, bioma: "savana e rio", tamanho: 7, animais: [{ especie: "GAZELA", quantidade: 1 }] },
        { numero: 4, bioma: "rio", tamanho: 8, animais: [] },
        { numero: 5, bioma: "savana", tamanho: 9, animais: [{ especie: "LEAO", quantidade: 1 }] },
      ];
  
      this.animais = {
        LEAO: { tamanho: 3, biomas: ["savana"], carnivoro: true },
        LEOPARDO: { tamanho: 2, biomas: ["savana"], carnivoro: true },
        CROCODILO: { tamanho: 3, biomas: ["rio"], carnivoro: true },
        MACACO: { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
        GAZELA: { tamanho: 2, biomas: ["savana"], carnivoro: false },
        HIPOPOTAMO: { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false },
      };
    }
  
    analisaRecintos(animal, quantidade) {
      const validateAnimal = this.validateAnimal(animal);
      if (validateAnimal.erro) return validateAnimal;
  
      const validateQuantity = this.validateQuantity(quantidade);
      if (validateQuantity.erro) return validateQuantity;
  
      const animalInfo = this.animais[animal];
      const tamanhoNecessario = animalInfo.tamanho * quantidade;
  
      const recintosViaveis = this.recintos.filter(recinto => {
        if (!this.isBiomaCompatible(recinto.bioma, animalInfo.biomas, animal)) return false;
        const espacoOcupado = this.calculateOccupiedSpace(recinto.animais, this.animais);
        const espacoRestante = recinto.tamanho - espacoOcupado;
        if (recinto.animais.length > 0 && recinto.animais[0].especie !== animal) espacoRestante -= 1;
        return espacoRestante >= tamanhoNecessario;
      }).map(recinto => `Recinto ${recinto.numero} (espaço livre: ${recinto.tamanho - this.calculateOccupiedSpace(recinto.animais, this.animais) - tamanhoNecessario} total: ${recinto.tamanho})`);
  
      return recintosViaveis.length > 0 ? { recintosViaveis: recintosViaveis.sort() } : { erro: "Não há recinto viável" };
    }
  
    validateAnimal(animal) {
      return this.animais[animal] ? {} : { erro: "Animal inválido" };
    }
  
    validateQuantity(quantidade) {
      return Number.isInteger(quantidade) && quantidade > 0 ? {} : { erro: "Quantidade inválida" };
    }
  
    isBiomaCompatible(bioma, biomas, animal) {
      return biomas.includes(bioma) || (animal === "HIPOPOTAMO" && bioma === "savana e rio");
    }
  
    calculateOccupiedSpace(animais, animaisInfo) {
      return animais.reduce((total, animal) => total + animaisInfo[animal.especie].tamanho * animal.quantidade, 0);
    }
  }
  
  export { RecintosZoo as RecintosZoo };