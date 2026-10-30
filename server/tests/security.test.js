import test from 'node:test';
import assert from 'node:assert/strict';
import {hash,token,seal,unseal,cleanEmail,isId,paise,ytId} from '../src/utils/security.js';
process.env.JWT_SECRET='a-test-secret-with-over-32-characters-long';
test('invitation bearer tokens use 32 random bytes and hash deterministically',()=>{const a=token(),b=token();assert.notEqual(a,b);assert.ok(a.length>=40);assert.equal(hash(a),hash(a));assert.notEqual(hash(a),a)});
test('invitation link can be encrypted for scheduled email delivery',()=>{const plain=token();const encrypted=seal(plain);assert.notEqual(encrypted,plain);assert.equal(unseal(encrypted),plain);const parts=encrypted.split('.');parts[1]=(parts[1][0]==='A'?'B':'A')+parts[1].slice(1);assert.throws(()=>unseal(parts.join('.')))});
test('amounts store integer paise and reject negative/non numbers',()=>{assert.equal(paise('1200.25'),120025);assert.equal(paise('0.99'),99);assert.throws(()=>paise('-10'));assert.throws(()=>paise('not-money'))});
test('YouTube IDs and permitted video URL patterns only',()=>{assert.equal(ytId('dQw4w9WgXcQ'),'dQw4w9WgXcQ');assert.equal(ytId('https://www.youtube.com/watch?v=dQw4w9WgXcQ'),'dQw4w9WgXcQ');assert.equal(ytId('https://youtu.be/dQw4w9WgXcQ'),'dQw4w9WgXcQ');assert.equal(ytId('https://evil.example/watch?v=dQw4w9WgXcQ'),null)});
test('email and object id input validation',()=>{assert.equal(cleanEmail(' A@Example.com '),'a@example.com');assert.ok(isId('507f1f77bcf86cd799439011'));assert.ok(!isId('not-an-id'))});
