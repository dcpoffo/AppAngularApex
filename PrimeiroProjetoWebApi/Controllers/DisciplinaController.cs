using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PrimeiroProjetoWebApi.data;
using PrimeiroProjetoWebApi.models;

namespace PrimeiroProjetoWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DisciplinaController : ControllerBase
    {
        private readonly IRepository _repositorio;

        public DisciplinaController(IRepository repo)
        {
            _repositorio = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await _repositorio.ObterTodasAsDisciplinasAsync(true);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> post(Disciplina model)
        {
            try
            {
                _repositorio.Add(model);

                if(await _repositorio.SaveChangesAsync())
                {
                    return Ok(model);
                } 
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }

            return BadRequest();
        }

        [HttpPut("{disciplinaId}")]
        public async Task<IActionResult> put(int disciplinaId, Disciplina model)
        {
            try
            {
                var disciplina = await _repositorio.ObterDisciplinaAsyncPeloId(disciplinaId);
                if(disciplina == null) 
                {
                    return NotFound();
                }

                _repositorio.Update(model);

                if(await _repositorio.SaveChangesAsync())
                {
                    return Ok(model);
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }

            return BadRequest();
        }

        [HttpDelete("{disciplinaId}")]
        public async Task<IActionResult> delete(int disciplinaId)
        {
            try
            {
                var disciplina = await _repositorio.ObterDisciplinaAsyncPeloId(disciplinaId);
                if(disciplina == null) return NotFound();

                _repositorio.Delete(disciplina);

                if(await _repositorio.SaveChangesAsync())
                {
                    return Ok(
                        new {
                            message = "Deletado!"
                        } 
                    );
                }                
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }

            return BadRequest();
        }
    }
}