using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Azure.CognitiveServices.ContentModerator;
using Microsoft.CodeAnalysis.FlowAnalysis;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using webapi.event_.Domains;
using webapi.event_.Repositories;

namespace webapi.event_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class ComentariosEventoController : ControllerBase
    {
        ComentariosEventoRepository comentario = new ComentariosEventoRepository();

        //armazena dados do serviço da api externa(ai - azure)
        private readonly ContentModeratorClient _contentModeratorClient;
        /// <summary>
        /// Construtor que recebe os dados necessários para acesso ao serviço externo
        /// </summary>
        /// <param name="contentModeratorClient">objeto do tipo _contentModeratorClient</param>
        public ComentariosEventoController(ContentModeratorClient contentModeratorClient)
        {
            _contentModeratorClient = contentModeratorClient;
        }

        [HttpPost("ComentarioIA")]

        public async Task<IActionResult> PostIA(ComentariosEvento novoComentario)
        {
            try
            {
                if (( novoComentario.Descricao).IsNullOrEmpty())
                {
                    return BadRequest("A descriçaõ do Comentário não pode estar vazio.");
                }

                using var stream = new MemoryStream(Encoding.UTF8.GetBytes(novoComentario.Descricao));

                var moderationResult = await _contentModeratorClient.TextModeration
                    .ScreenTextAsync("text/plain", stream, "por", false, false, null, true);

                if (moderationResult.Terms != null)
                {
                    novoComentario.Exibe = false;

                    comentario.Cadastrar(novoComentario);
                }
                else
                {
                    novoComentario.Exibe= true;
                    comentario.Cadastrar(novoComentario);
                }
                return StatusCode(201, novoComentario);
            }
            catch (Exception e)
            {
                    
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        public IActionResult get()
        {
            try
            {
                return Ok(comentario.Listar());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("ListarSomenteExibe")]
        public IActionResult getExibe(Guid id)
        {
            try
            {
                return Ok(comentario.ListarSomenteExibe(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("BuscarPorIdUsuario")]
        public IActionResult getById(Guid idUsuario, Guid idEvento)
        {
            try
            {
                return Ok(comentario.BuscarPorIdUsuario(idUsuario, idEvento));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            try
            {
                comentario.Deletar(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }

    }

}
