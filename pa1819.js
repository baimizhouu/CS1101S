
function count_island(emap){
    const R = array_length(emap);
    const C = array_length(emap[0]);
    const notepad = [];
    for(let i = 0; i < R; i = i + 1){
        notepad[i] = [];
        for(let j = 0; j < C ; j = j + 1){
            notepad[i][j] = 0;
        }
    }
    
    function check(i, j){
        return notepad[i][j] !== 1;
    }
    
    function note(r, c){
        if(!(r < R && r >= 0 && c < C && c >= 0)){
            return 0;
        }
        const lst = list(pair(r, c - 1) 
                       , pair(r + 1, c), pair(r - 1, c), pair(r, c + 1));
        if(emap[r][c] > 0 && notepad[r][c] === 0){
            notepad[r][c] = 1;
            accumulate((p, y) => note(head(p), tail(p)), undefined, lst);
        }
    }
    let ans = 0;
    for(let i = 0; i < R; i = i + 1){
        for(let j = 0; j < C; j = j + 1){
            if(emap[i][j] === 0){
                continue;
            }
            if(check(i, j)){
                //display(i, 'i');
                //display(j, 'j');
                //display(notepad);
                ans = ans + 1;
                note(i, j);
            } else {
                continue;
            }
        }
    }
    //display(notepad);
    return ans;
}

const emapB1 =
[[2, 1, 0, 2, 1, 1, 3],
 [0, 1, 0, 1, 0, 0, 2],
 [0, 0, 0, 2, 3, 1, 1],
 [1, 0, 2, 0, 0, 0, 0],
 [0, 0, 1, 2, 0, 0, 0],
 [1, 0, 3, 0, 1, 1, 2]];
 //count_island(emapB1);
 const emapB2 =
[[1, 2, 0, 0, 1, 0, 0, 1],
 [1, 2, 2, 3, 1, 0, 2, 1],
 [0, 1, 1, 0, 1, 0, 0, 1],
 [0, 0, 0, 0, 0, 3, 3, 0],
 [1, 1, 2, 0, 0, 0, 0, 0],
 [1, 0, 1, 0, 0, 1, 2, 3],
 [1, 3, 2, 1, 1, 0, 1, 1]];
  count_island(emapB2);
//11:02
const emapA1 =
[[3, 1, 1, 1, 1, 1, 1],
 [1, 1, 1, 1, 2, 3, 1],
 [1, 0, 3, 2, 1, 1, 0],
 [1, 1, 1, 1, 3, 1, 1],
 [1, 2, 1, 1, 3, 1, 3],
 [1, 1, 1, 1, 4, 1, 1]];
function permutation(lst){
    return is_null(lst) 
            ? list(null) 
            : accumulate((x, y) => append(y, map(ls => pair(x, ls)
                                                , permutation(remove(x, lst))))
                        , null
                        , lst);
}
function list_to_array(L) {
    const A = [];
    let i = 0;
    for (let p = L; !is_null(p); p = tail(p)) {
        A[i] = head(p);
        i = i + 1;
    }
    return A;
}
function reverse_array(A) {
    const len = array_length(A);
    const half_len = math_floor(len / 2);
    for (let i = 0; i < half_len; i = i + 1) {
        swap(A, i, len - 1 - i);
    }
}
function swap(A, i, j) {
    const temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}
function copy_array(A) {
    const len = array_length(A);
    const B = [];
    for (let i = 0; i < len; i = i + 1) {
        B[i] = A[i];
    }
    return B;
}
function digits_to_string(digits) {
    const len = array_length(digits);
    let str = "";
    for (let i = 0; i < len; i = i + 1) {
        str = str + stringify(digits[i]);
    }
    return str;
}
function sort_ascending(A) {
    const len = array_length(A);
    for (let i = 1; i < len; i = i + 1) {
        const x = A[i];
        let j = i - 1;
        while (j >= 0 && A[j] > x) {
            A[j + 1] = A[j];
            j = j - 1;
        }
        A[j + 1] = x;
    }
}
function array_to_list(A) {
    const len = array_length(A);
    let L = null;
    for (let i = len - 1; i >= 0; i = i - 1) {
        L = pair(A[i], L);
    }
    return L;
}
function make_big_int_from_number(num){
    if(num === 0){
        return list(0);
    } else if(math_floor(num / 10) === 0){
        return pair(num, null);
    } else {
        return pair(num % 10, make_big_int_from_number(math_floor(num / 10)));
    }
}

//display_list(make_big_int_from_number(1234));
function big_int_to_string(bint){

    function helper(s, bint){
        return is_null(bint) ? s 
                             : helper(list_to_string(head(bint)) + s
                                                , tail(bint));
    }
    return helper("", bint);
}
//big_int_to_string(make_big_int_from_number(88812300));
function big_int_add(bintX, bintY){
    let flag = 0;
    let ans = null;
    while(!(is_null(bintX) && is_null(bintY))){
        const x = is_null(bintX) ? 0 : head(bintX);
        const y = is_null(bintY) ? 0 : head(bintY);
        if(x + y + flag >= 10){
            ans = pair(x + y + flag -10 , ans);
            flag = 1;
        } else {
            ans = pair(x + y + flag , ans);
            flag = 0;
        }
        bintX = is_null(bintX) ? null : tail(bintX);
        bintY = is_null(bintY) ? null : tail(bintY);
    }
    if(flag === 1){
        ans = pair(1, ans);
    }
    return reverse(ans);
}
//big_int_add(list(7, 8, 9), list(5, 6));
//big_int_add(list(0, 9), list(0, 1, 2, 3));
function big_int_mult_by_digit(bint, digit){
    let flag = 0;
    let ans = null;
    function process(num, lst){
        //display(flag, "flag");
        const mult = digit * num + flag;
        //display(mult, 'mult');
        const a = mult % 10;
        //display(a ,'a');
        flag = (mult - a) / 10;
        return pair(a, lst);
    }
    const check = accumulate(process, ans, reverse(bint));
    return reverse(pair(flag, check));
}
//big_int_mult_by_digit(list(1, 1, 1, 1, 1, 1, 1, 9), 3);
function big_int_mult_by_10_pow_n(bint, n){
    function copy(lst){
        return accumulate((x, y) => pair(x, y), null, lst);
    }
    if(array_length(bint) === 1 && head(bint) === 0){
        return list(0);
    } else {
        let ans = copy(bint);
        for(let i = 0; i < n; i = i + 1){
            ans = pair(0, ans);
        }
        return ans;
    }
}
//big_int_mult_by_10_pow_n(list(7, 4, 3), 20);
function bit_int_mult(bintX, bintY){
    let pow = length(bintY) - 1;
    function mult(digit, cur){
        const powed = big_int_mult_by_10_pow_n(bintX, pow);
        const multed = big_int_mult_by_digit(powed, digit);
        pow = pow - 1;
        return big_int_add(multed, cur);
    }
    return accumulate(mult, list(0), bintY);
}
//bit_int_mult(list(7, 8, 9), list(5, 6));
function build_largest_int(digits){
    let arr = copy_array(digits);
    sort_ascending(arr);
    reverse_array(arr);
    return digits_to_string(arr);
}
//build_largest_int([0, 1, 1, 0, 9]);
function array_to_number(arr){
    let N = array_length(arr);
    let pow = N - 1;
    let ans = 0;
    for(let i = 0; i < N; i = i + 1){
        ans = ans + arr[i] * math_pow(10, pow);
        pow = pow - 1;
    }
    return ans;
}
function bulid_nth_largest_int(digits, n){
    let lst = array_to_list(digits);
    lst = permutation(lst);
    let numbers = list_to_array(map(list_to_array, lst));
    //display(numbers);
    for(let i = 0; i < array_length(numbers); i = i + 1){
        numbers[i] = array_to_number(numbers[i]);
    }
    
    sort_ascending(numbers);
    reverse_array(numbers);
    if(n >= array_length(numbers)){
        n = array_length(numbers);
    }
    return stringify(numbers[n - 1]);
}
function count_lower_neighbors(emap, r, c){
    const R = array_length(emap);
    const C = array_length(emap[0]);
    if(r === 0 || r === R - 1 || c === 0 || c === C - 1){
        return 0;
    } else {
        const v = emap[r][c];
        const lst = list(emap[r][c - 1], emap[r + 1][c - 1], emap[r - 1][c - 1]
                       , emap[r + 1][c], emap[r + 1][c], emap[r][c + 1]
                       , emap[r + 1][c + 1], emap[r - 1][c + 1]);
        return accumulate((x, cout) => x < v ? cout + 1 : cout, 0, lst);
    }
}
function count_0_neighbors(emap, r, c){
    const R = array_length(emap);
    const C = array_length(emap[0]);
    if(r === 0 || r === R - 1 || c === 0 || c === C - 1){
        return 0;
    } else {
        const v = 0;
        const lst = list(emap[r][c - 1], emap[r + 1][c - 1], emap[r - 1][c - 1]
                       , emap[r + 1][c], emap[r + 1][c], emap[r][c + 1]
                       , emap[r + 1][c + 1], emap[r - 1][c + 1]);
        return accumulate((x, cout) => x === v ? cout + 1 : cout, 0, lst);
    }
}
function count_peaks(emap){
    const R = array_length(emap);
    const C = array_length(emap[0]);
    let count = 0;
    for(let i = 0; i < R; i = i + 1){
        for(let j = 0; j < C; j = j + 1){
            if(count_lower_neighbors(emap, i, j) === 8){
                count = count + 1;
            }
        }
    }
    return count;
}
display_list(permutation(list(1, 2, 3, 4)));