export interface Product {
    id?: number 
    name: string
    price: number 
}

export interface ProductDeleteRequest {
    id: any; // NÃO ACEITA O TIPO NUMBER VERIFICAR
  }