using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Project.Core
{
    public class HashFn
    {
        // PBKDF2 (RFC 2898) algorithm
        // Hashes are 118 length

        private const int _iteration = 1000;
        private const int _saltSize = 16; // 128 bit
        private const int _keySize = 64; // 512 bit

        public static string HashPassword(string password)
        {
            var algorithm = new Rfc2898DeriveBytes(
                    password: password,
                    saltSize: _saltSize,
                    iterations: _iteration,
                    hashAlgorithm: HashAlgorithmName.SHA256
                );
            string key = Convert.ToBase64String(algorithm.GetBytes(_keySize));
            string salt = Convert.ToBase64String(algorithm.Salt);

            string hashed = $"{_iteration}.{salt}.{key}";
            return hashed;
        }

        public static bool CheckPassword(string hash, string password)
        {
            var parts = hash.Split('.');
            if (parts.Length != 3)
                throw new FormatException("Unexpected hash format!");

            var iteration = Convert.ToInt32(parts[0]);
            var salt = Convert.FromBase64String(parts[1]);
            var key = Convert.FromBase64String(parts[2]);

            var algorithm = new Rfc2898DeriveBytes(
                    password: password,
                    salt: salt,
                    iterations: iteration,
                    hashAlgorithm: HashAlgorithmName.SHA256
                );

            return algorithm.GetBytes(_keySize).SequenceEqual(key);
        }
    }
}
