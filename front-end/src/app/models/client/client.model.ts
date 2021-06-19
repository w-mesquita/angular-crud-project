export interface Client {
    id?: number 
    name: string
    email: string
    salario: number
    estado: string
    empresa: string
    idade: number
    sexo: string
    cpf: string
}

export interface ClientDeleteRequest {
    id: any; // NÃO ACEITA O TIPO NUMBER VERIFICAR
  }