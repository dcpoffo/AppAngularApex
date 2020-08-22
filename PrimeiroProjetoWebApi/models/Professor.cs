using System.Collections.Generic;

namespace PrimeiroProjetoWebApi.models
{
    public class Professor
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public IEnumerable<Disciplina> Disciplinas {get; set;}


        public Professor()
        {}

        public Professor(int id, string nome) 
        {
            this.Id = id;
            this.Nome = nome;
        }
    }
}