import React, { useState, FormEvent, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom' 
import { toast } from 'react-toastify'

import api from '../../services/api'

import Logo from '../../img/logo-github.svg'
import { Title, Form, Repositories, Error } from './style';

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
  const [inputError, setInputError] = useState('')
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storageRepositories = localStorage.getItem('@githubexplorer')

    if(storageRepositories) {
      return JSON.parse(storageRepositories)
    } else {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('@githubexplorer', JSON.stringify(repositories))
  }, [repositories])

  async function handleAddRepository(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // add new repositories
    if(!newRepo) {
      setInputError('Digite o nome do repositório!')
      toast.error('Este campo está vazio')
      return
    }
    try {
      const response = await api.get(`repos/${newRepo}`)
      const repository = response.data
      console.log(repository)
      setRepositories([...repositories, repository])
      setNewRepo('')
      setInputError('')
      toast.success('Diretório adicionado com sucesso!!!')
    } catch (error) {
      return toast.error('Oops, algo de errado não deu certo!!!')
    }
  }

  return (
    <>
      <img src={Logo} alt="Logo App"/>
      <Title>Encontre repositórios no GitHub</Title>
      <Form 
        hasError={!!inputError} 
        onSubmit={handleAddRepository}
      >
        <input
          value={newRepo}
          onChange={ e => setNewRepo(e.target.value)}
          type="text"
          placeholder="Digite o nome do repositório"
        />
        <button type="submit" >Pesquisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <Repositories>
        {repositories.map((repo, index) => (
          <Link key={index} to="/repository">
            <img 
              src={repo.owner.avatar_url}
              alt={repo.owner.login}
            />
            <div>
              <strong>{repo.full_name}</strong>
              <p>{repo.description}</p>
            </div>
            <FiChevronRight size={40}/>
          </Link>

        ))}
      </Repositories>
    </>
  )
}

export default Home;