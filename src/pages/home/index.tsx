import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi'
import { toast } from 'react-toastify'

import api from '../../services/api'

import Logo from '../../img/logo-github.svg'
import { Title, Form, Repositories } from './style';

interface Repository {
  full_name: string,
  description: string,
  owner: {
    login: string,
    avatar_url: string
  }
}

const Home: React.FC = () => {

  const [newRepo, setNewRepo] = useState('')
  const [repositories, setRepositories] = useState<Repository[]>([])

  async function handleAddRepository(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // add new repositories
    try {
      const response = await api.get(`repos/${newRepo}`)
      const repository = response.data
      console.log(repository)
      setRepositories([...repositories, repository])
      setNewRepo('')
      toast.success('Diretório adicionado com sucesso!!!')
    } catch (error) {
      return toast.error('Oops, algo de errado não deu certo!!!')
    }
  }

  return (
    <>
      <img src={Logo} alt="Logo App"/>
      <Title>Encontre repositórios no GitHub</Title>
      <Form onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={ e => setNewRepo(e.target.value)}
          type="text"
          placeholder="Digite o nome do repositório"
        />
        <button type="submit" >Pesquisar</button>
      </Form>
      <Repositories>
        {repositories.map((repo, index) => (
          <a key={index} href="repo">
            <img 
              src={repo.owner.avatar_url}
              alt={repo.owner.login}
            />
            <div>
              <strong>{repo.full_name}</strong>
              <p>{repo.description}</p>
            </div>
            <FiChevronRight size={40}/>
          </a>

        ))}
      </Repositories>
    </>
  )
}

export default Home;