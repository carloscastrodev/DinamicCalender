package com.example.demo.services;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.NovaSenhaRequestDTO;
import com.example.demo.exceptions.BadRequestException;
import com.example.demo.exceptions.DuplicateEntryException;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.exceptions.UnauthorizedException;
import com.example.demo.model.entities.Usuario;
import com.example.demo.model.repositories.UsuarioRepository;

@Service
public class UserService {
	@Autowired	
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UsuarioRepository userRepository;
	
	public UserService() {
	}
	
	@Transactional
	public Usuario createUser(Usuario user) throws Exception {
		if (userRepository.findByEmail(user.getEmail()) != null) {
			throw new DuplicateEntryException(user.getEmail() + "já está cadastrado.");
		}
		user.setSenha(passwordEncoder.encode(user.getSenha()));
		Usuario u = userRepository.save(user);
		
		return u;
	}
	
	@Transactional(readOnly = true)
	public Usuario findUserById(int id) throws Exception {
		Usuario u = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Usuário não pode ser encontrado"));
		return u;
	}
	
	@Transactional(readOnly = true)
	public Set<Usuario> findUsersByNome(String nome) throws Exception {
		Set<Usuario> u = userRepository.findByNome(nome);
		
		if (u == null) {
			throw new ResourceNotFoundException("Nenhum usuário pode ser encontrado");
		}
		
		return u;
	}
	
	@Transactional
	public Usuario updateUser(int id, Usuario dadosUsuario) throws Exception {

    	Usuario u = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não pode ser encontrado"));
    	
    	if (dadosUsuario.getEmail() != null && !dadosUsuario.getEmail().equals(u.getEmail())) {
    		if (userRepository.findByEmail(dadosUsuario.getEmail()) != null) {
    			throw new DuplicateEntryException(dadosUsuario.getEmail() + " já está cadastrado.");
    		}
    		u.setEmail(dadosUsuario.getEmail());
    	}
    	
    	if (dadosUsuario.getNome() != null && dadosUsuario.getNome() != u.getNome()) {
    		u.setNome(dadosUsuario.getNome());
    	}
    	
    	if (dadosUsuario.getSobrenome() != null && dadosUsuario.getSobrenome() != u.getSobrenome()) {
    		u.setSobrenome(dadosUsuario.getSobrenome());
    	}
    	
    	if (dadosUsuario.getNascimento() != null && dadosUsuario.getNascimento() != u.getNascimento()) {
    		u.setNascimento(dadosUsuario.getNascimento());
    	}
    	
    	if (dadosUsuario.getGenero() != null && dadosUsuario.getGenero() != u.getGenero()) {
    		u.setGenero(dadosUsuario.getGenero());
    	}

        userRepository.save(u);
        return u;
		
	}
	
	@Transactional
	public Usuario changeUserPassword(int id, NovaSenhaRequestDTO novaSenhaDTO) throws Exception {
		Usuario u = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não pode ser encontrado"));
		
		if (novaSenhaDTO.getNovaSenha().length() < 8 || novaSenhaDTO.getNovaSenha()==null) {
			throw new BadRequestException("A senha deve conter pelo menos 8 caractéres");
		}
		
		if (passwordEncoder.matches(novaSenhaDTO.getSenhaAtual(), u.getSenha())) {
			String senha = passwordEncoder.encode(novaSenhaDTO.getNovaSenha());
			u.setSenha(senha);
			
			userRepository.save(u);
			return u;
		}
		
		throw new UnauthorizedException();
		
	}
	
	@Transactional 
	public void deleteUserById(int id) throws Exception {
		userRepository.deleteById(id);
	}
}