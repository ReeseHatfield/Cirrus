import hashlib
import secrets

def gen_salt(num_bytes: int) -> str:
    """
    Generate a base64 encoded salt.
    :param num_bytes: Number of bytes for the salt.
    :return: Base64 encoded salt.
    """
    return secrets.token_urlsafe(num_bytes)

def hash(plaintext: str) -> (str, str):
    """
    Hash a plaintext string using SHA-256 with a generated salt.
    :param plaintext: The plaintext string to hash.
    :return: A tuple containing the hash and the raw salt.
    """
    plaintext = plaintext.strip()
    raw_salt = gen_salt(8)

    hash_me = raw_salt + plaintext
    result = hashlib.sha256(hash_me.encode()).hexdigest()

    return result, raw_salt
