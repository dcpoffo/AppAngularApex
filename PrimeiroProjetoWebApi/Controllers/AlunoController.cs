using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PrimeiroProjetoWebApi.data;
using PrimeiroProjetoWebApi.models;

namespace PrimeiroProjetoWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AlunoController : ControllerBase
    {
        private readonly IRepository _repositorio;

        public AlunoController(IRepository repositorio)
        {
            this._repositorio = repositorio;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var result = await _repositorio.GetAllAlunosAsync(includeProfessor: true);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro ao obter todos os alunos: \n{ex.Message}");
            }
        }

        [HttpGet("{alunoId}")]
        public async Task<IActionResult> GetById(int alunoId)
        {
            try
            {
                var result = await _repositorio.GetAlunoAsyncById(alunoId, false);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro ao obter o aluno: \n{ex.Message}");
            }
        }

        [HttpGet("disciplinaId={disciplinaId}")]
        public async Task<IActionResult> GetByDisciplinaId(int disciplinaId)
        {
            try
            {
                var result = await _repositorio.GetAllAlunosAsyncByDisciplinaID(disciplinaId, includeDisciplina: true);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro ao obter os alunos pela disciplina: \n{ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Aluno aluno)
        {
            try
            {
                _repositorio.Add(aluno);
                if (await _repositorio.SaveChangesAsync())
                {
                    return Ok(aluno);
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro ao salvar o aluno: {ex.Message}");
            }
            return BadRequest();
        }

        [HttpPut("{alunoId}")]
        public async Task<IActionResult> Put(int alunoId, Aluno aluno)
        {
            try
            {
                var alunoCadastrado = await _repositorio.GetAlunoAsyncById(alunoId, false);
                if (alunoCadastrado == null)
                {
                    return NotFound();
                }

                _repositorio.Update(aluno);
                if (await _repositorio.SaveChangesAsync())
                {
                    return Ok(aluno);
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro ao editar o aluno: {ex.Message}");
            }
            return BadRequest();
        }

        [HttpDelete("{alunoId}")]
        public async Task<IActionResult> Delete(int alunoId)
        {
            try
            {
                var alunoCadastrado = await _repositorio.GetAlunoAsyncById(alunoId, false);
                if (alunoCadastrado == null)
                {
                    return NotFound();
                }

                _repositorio.Delete(alunoCadastrado);
                if (await _repositorio.SaveChangesAsync())
                {
                    return Ok(
                         new
                         {
                             message = "Aluno removido com sucesso"
                         }
                    );
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro ao deletar o aluno: {ex.Message}");
            }
            return BadRequest();
        }
    }
}