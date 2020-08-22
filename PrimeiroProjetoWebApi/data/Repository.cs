using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PrimeiroProjetoWebApi.models;

namespace PrimeiroProjetoWebApi.data
{
      public class Repository : IRepository
      {
            private readonly DataContext _context;
            public Repository(DataContext context)
            {
                  this._context = context;
            }
            public void Add<T>(T entity) where T : class
            {
                  _context.Add(entity);
            }

            public void Delete<T>(T entity) where T : class
            {
                  _context.Remove(entity);
            }

            public void Update<T>(T entity) where T : class
            {
                  _context.Update(entity);
            }

            public async Task<bool> SaveChangesAsync()
            {
                  return (await _context.SaveChangesAsync()) > 0;
            }

            public async Task<Aluno[]> GetAllAlunosAsync(bool includeProfessor)
            {
                  IQueryable<Aluno> query = _context.Aluno;

                  if (includeProfessor)
                  {
                        query = query.Include(a => a.AlunoDisciplinas)
                                     .ThenInclude(ad => ad.Disciplina)
                                     .ThenInclude(d => d.Professor);
                  }

                  query = query.AsNoTracking().OrderBy(a => a.Id);

                  return await query.ToArrayAsync();
            }

            public async Task<Aluno[]> GetAllAlunosAsyncByDisciplinaID(int disciplinaId, bool includeDisciplina)
            {
                  IQueryable<Aluno> query = _context.Aluno;

                  if (includeDisciplina)
                  {
                        query = query.Include(a => a.AlunoDisciplinas)
                                     .ThenInclude(ad => ad.Disciplina)
                                     .ThenInclude(d => d.Professor);
                  }

                  query = query.AsNoTracking()
                              .OrderBy(a => a.Id)
                              .Where(
                                          a => a.AlunoDisciplinas.Any(
                                          ad => ad.DisciplinaId == disciplinaId
                                    )
                              );

                  return await query.ToArrayAsync();
            }

            public async Task<Aluno> GetAlunoAsyncById(int alunoId, bool includeProfessor)
            {
                  IQueryable<Aluno> query = _context.Aluno;

                  if (includeProfessor)
                  {
                        query = query.Include(a => a.AlunoDisciplinas)
                                     .ThenInclude(ad => ad.Disciplina)
                                     .ThenInclude(d => d.Professor);
                  }

                  query = query.AsNoTracking()
                              .OrderBy(a => a.Id)
                              .Where(a => a.Id == alunoId);

                  return await query.FirstOrDefaultAsync();
            }

            public async Task<Professor[]> GetAllProfessoresAsync(bool includeAluno)
            {
                  IQueryable<Professor> query = _context.Professor;

                  if (includeAluno)
                  {
                        query = query.Include(p => p.Disciplinas)
                                     .ThenInclude(ad => ad.AlunoDisciplinas)
                                     .ThenInclude(a => a.Aluno);
                  }

                  query = query.AsNoTracking().OrderBy(a => a.Id);

                  return await query.ToArrayAsync();
            }

            public async Task<Professor[]> GetAllProfessoresAsyncByAlunoId(int alunoId, bool includeDisciplina)
            {
                  IQueryable<Professor> query = _context.Professor;

                  if (includeDisciplina)
                  {
                        query = query.Include(c => c.Disciplinas);
                  }

                  query = query.AsNoTracking()
                              .OrderBy(aluno => aluno.Id)
                              .Where(
                                          aluno => aluno.Disciplinas.Any(
                                          d => d.AlunoDisciplinas.Any(
                                                ad => ad.AlunoId == alunoId
                                          )
                                    )
                              );

                  return await query.ToArrayAsync();
            }

            public async Task<Professor> GetProfessorAsyncById(int professorId, bool includeAluno)
            {
                  IQueryable<Professor> query = _context.Professor;

                  if (includeAluno)
                  {
                        query = query.Include(a => a.Disciplinas)
                                     .ThenInclude(ad => ad.AlunoDisciplinas)
                                     .ThenInclude(d => d.Aluno);
                  }

                  query = query.AsNoTracking()
                              .OrderBy(p => p.Id)
                              .Where(p => p.Id == professorId);

                  return await query.FirstOrDefaultAsync();
            }
      }
}