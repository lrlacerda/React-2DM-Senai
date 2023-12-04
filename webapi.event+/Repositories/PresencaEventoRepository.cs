using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.event_.Domains;
using webapi.event_.Interfaces;

namespace webapi.event_.Repositories
{
    public class PresencaEventoRepository
    {
        //Repository

        public List<PresencasEvento> ListarMinhas(Guid id)
        {
            return _context.PresencasEvento
                .Select(p => new PresencasEvento
                {
                    IdPresencaEvento = p.IdPresencaEvento,
                    Situacao = p.Situacao,
                    IdUsuario = p.IdUsuario,

                    Evento = new Evento
                    {
                        IdEvento = p.IdEvento,
                        DataEvento = p.Evento!.DataEvento,
                        NomeEvento = p.Evento.NomeEvento,
                        Descricao = p.Evento.Descricao,

                        Instituicao = new Instituicao
                        {
                            IdInstituicao = p.Evento.IdInstituicao,
                            NomeFantasia = p.Evento.Instituicao!.NomeFantasia
                        }
                    }

                }).Where(p => p.IdUsuario == id).ToList();
        }


        

    }
}
