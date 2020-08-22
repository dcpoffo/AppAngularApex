using System.Threading.Tasks;
using PrimeiroProjetoWebApi.models;

namespace PrimeiroProjetoWebApi.data
{
    public interface IRepository
    {
        //metodos geral, generico para todos
         void Add<T>(T entity) where T : class;
         void Update<T>(T entity) where T : class;
         void Delete<T>(T entity) where T : class;
         Task<bool> SaveChangesAsync();

        //trazer informacoes do aluno
         Task<Aluno[]> GetAllAlunosAsync(bool includeProfessor);
         Task<Aluno[]> GetAllAlunosAsyncByDisciplinaID(int disciplinaId, bool includeDisciplina);
         Task<Aluno> GetAlunoAsyncById(int alunoId, bool includeProfessor);

        //trazer informacoes do professor
        Task<Professor[]> GetAllProfessoresAsync(bool includeAluno);
        Task<Professor[]> GetAllProfessoresAsyncByAlunoId(int alunoId, bool includeDisciplina);
        Task<Professor> GetProfessorAsyncById(int professorId, bool includeAluno);

    }
}