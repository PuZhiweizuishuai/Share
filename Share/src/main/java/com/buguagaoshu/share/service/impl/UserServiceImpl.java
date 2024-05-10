package com.buguagaoshu.share.service.impl;

import com.buguagaoshu.share.domain.User;
import com.buguagaoshu.share.repository.UserRepository;
import com.buguagaoshu.share.service.UserService;
import com.buguagaoshu.share.utils.PasswordUtil;
import org.springframework.stereotype.Service;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * @create 2024-05-08
 */
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public void save(User user) {
        user.setPassword(PasswordUtil.encode(user.getPassword()));
        userRepository.save(user);
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findAllByUsername(username);
    }

    @Override
    public User login(User user) {
        User sys = findByUsername(user.getUsername());
        if (sys != null) {
            if (PasswordUtil.judgePassword(user.getPassword(), sys.getPassword())) {
                sys.setPassword("");
                return sys;
            }
            return null;
        }
        return null;
    }

    @Override
    public User changePassword(User user) {
        if (user.getPassword() == null) {
            return null;
        }
        User sys = findByUsername(user.getUsername());
        if (sys != null) {
            if (PasswordUtil.judgePassword(user.getOldPassword(), sys.getPassword())) {
                sys.setPassword(PasswordUtil.encode(user.getPassword()));
                userRepository.save(sys);
                sys.setPassword("");
                return sys;
            }
            return null;
        }
        return null;
    }

    @Override
    public User addUser(User user) {
        if (user.getUsername() != null
                && !user.getUsername().isEmpty()
                && user.getPassword() != null
                && user.getPassword().isEmpty()) {
            user.setCreateTime(System.currentTimeMillis());
            user.setPassword(PasswordUtil.encode(user.getPassword()));
            userRepository.save(user);
        }
        return null;
    }
}
