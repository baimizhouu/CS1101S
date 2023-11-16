function n(){
    function helper(n ,times){
        if(times === 0){
            return helper(n + 1, n + 1);
        } else {
            return pair(n, () => helper(n, times - 1));
        }
    }
    return helper(1, 1);
}
function table(table, height, width){
    function iter(arr, incre){
        let start = incre === 1 ? 0 : width - 1;
        let ans = null;
        while(start >= 0 && start < width){
            ans = append(ans, list(arr[start]));
            start = start + incre;
        }
        return ans;
    }
    let ans = null;
    let incre = 1;
    for(let i = 0; i < height; i = i + 1){
        ans = append(ans, iter(table[i], incre));
        incre = -incre;
    }
    return ans;
}
//table([[1,2,3],[4,5,6],[7,8,9],[10,11,12]], 4,3);
function mergeA(xs, ys){
    if(is_null(xs) || is_null(ys)){
        return append(xs, ys);
    }
    if(head(xs) < head(ys)){
        return pair(head(xs), mergeA(tail(xs), ys));
    } else {
        return pair(head(ys), mergeA(xs, tail(ys)));
    }
}
function mergeB(xs, ys){
    if(is_null(xs) || is_null(ys)){
        return append(xs, ys);
    }
    if(head(xs) < head(ys)){
        set_tail(xs, mergeB(tail(xs), ys));
        return xs;
    } else {
        set_tail(ys, mergeB(xs, tail(ys)));
        return ys;
    }
}
mergeB(list(1, 3, 5, 6,  9), list(0, 2, 4, 10));
function mergeC(xs, xs_len, ys, ys_len){
    let result = [];
    let result_len = xs_len + ys_len;
    let i = 0;
    let j = 0;
    for(let k = 0; k < result_len; k = k + 1){
        let x = i === xs_len ? Infinity : xs[i];
        let y = j === ys_len ? Infinity : ys[j];
        if(x < y){
            result[k] = x;
            i = i + 1;
        } else {
            result[k] = y;
            j = j + 1;
        }
    }
    return result;
}
mergeC([1], 1, [2,3,5,6,11],5);
function are_equal_sets(set1, set2){
    const check1 = accumulate((x, y) => filter(i => i !== x, y)
                            , set1, set2);
    const check2 = accumulate((x, y) => filter(i => i !== x, y)
                            , set2, set1);
    return is_null(check1) && is_null(check2);
}
//are_equal_sets(list(1,5, 2, 3, 10), list(10, 1, 5,2,3));
function power_set(set){
    if(is_null(set)){
        return list(null);
    }
    const without_head = power_set(tail(set));
    const add_head = map(lst => pair(head(set), lst), without_head);
    return append(add_head, without_head);
}
//display_list(power_set(list(3, 5, 6,10)));