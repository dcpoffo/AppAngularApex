using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PrimeiroProjetoWebApi.data;
using PrimeiroProjetoWebApi.models;

namespace PrimeiroProjetoWebApi.Controllers
{
      [ApiController]
      [Route("[controller]")]
      public class ProfessorController : ControllerBase
      {
            private readonly IRepository _repositorio;

            public ProfessorController(IRepository repositorio)
            {
                  this._repositorio = repositorio;
            }

            [HttpGet]
            public async Task<IActionResult> GetAll()
            {
                  try
                  {
                        var result = await _repositorio.GetAllProfessoresAsync(includeAluno: false);
                        return Ok(result);
                  }
                  catch (Exception ex)
                  {
                        return BadRequest($"Erro ao obter todos os Professores: \n{ex.Message}");
                  }
            }

            [HttpGet("{professorId}")]
            public async Task<IActionResult> GetById(int professorId)
            {
                  try
                  {
                        var result = await _repositorio.GetProfessorAsyncById(professorId, includeAluno: true);
                        return Ok(result);
                  }
                  catch (Exception ex)
                  {
                        return BadRequest($"Erro ao obter o professor: \n{ex.Message}");
                  }
            }

            [HttpGet("byAluno={alunoId}")]
            public async Task<IActionResult> GetByAlunoId(int alunoId)

            {
                  try
                  {
                        var result = await _repositorio.GetAllProfessoresAsyncByAlunoId(alunoId, includeDisciplina: true);
                        return Ok(result);
                  }
                  catch (Exception ex)
                  {
                        return BadRequest($"Erro ao obter os professores pelo aluno: \n{ex.Message}");
                  }
            }

            [HttpPost]
            public async Task<IActionResult> Post(Professor professor)
            {
                  try
                  {
                        _repositorio.Add(professor);
                        if (await _repositorio.SaveChangesAsync())
                        {
                              return Ok(professor);
                        }
                  }
                  catch (Exception ex)
                  {
                        return BadRequest($"Erro ao salvar o professor: {ex.Message}");
                  }
                  return BadRequest();
            }

            [HttpPut("{professorId}")]
            public async Task<IActionResult> Put(int professorId, Professor professor)
            {
                  try
                  {
                        var professorCadastrado = await _repositorio.GetProfessorAsyncById(professorId, false);
                        if (professorCadastrado == null)
                        {
                              return NotFound();
                        }

                        _repositorio.Update(professor);
                        if (await _repositorio.SaveChangesAsync())
                        {
                              return Ok(professor);
                        }
                  }
                  catch (Exception ex)
                  {
                        return BadRequest($"Erro ao editar o professor: {ex.Message}");
                  }
                  return BadRequest();
            }

            [HttpDelete("{professorId}")]
            public async Task<IActionResult> Delete(int professorId)
            {
                  try
                  {
                        var professorCadastrado = await _repositorio.GetProfessorAsyncById(professorId, false);
                        if (professorCadastrado == null)
                        {
                              return NotFound();
                        }

                        _repositorio.Delete(professorCadastrado);
                        if (await _repositorio.SaveChangesAsync())
                        {
                              return Ok("Professor removido com sucesso");
                        }
                  }
                  catch (Exception ex)
                  {
                        return BadRequest($"Erro ao deletar o professor: {ex.Message}");
                  }
                  return BadRequest();
            }

      }
}