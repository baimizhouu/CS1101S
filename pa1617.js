//14:45
function assert(expre, a, b){
    if(!expre()){
        error(a);
    } else {
        display("PASS");
    }
}
function is_nucleobase(str){
    const lst = list("A", "C", "G", "T");
    return accumulate((x, y) => y || equal(x, str), false, lst);
}
function is_dna_strand(strand){
    return accumulate((x, y) => y && is_nucleobase(x), true, strand);
}
function combine(lst){
    return accumulate((x, y) => append(x, y), null, lst);
}
function oxoguanine_repair(strand){
    return accumulate((x, y) => x === "8" ? pair("G", y) : pair(x, y)
                    , null
                    ,strand);
}
function find_gene_start(strand){
    let lst = null;
    function check(){
        if(length(lst) >= 3){
            const three = head(lst) + list_ref(lst, 1) + list_ref(lst, 2);
            if(three === "GTA"){
                return true;
            }
        }
        return false;
    }
    
    function process(x, y){
        if(check()){
            return pair(x, y);
        } else {
            lst = pair(x, lst);
            return null;
        }
    }
    return list(reverse(accumulate(process, null, reverse(strand))));
}
function find_gene_end(strand){
    let lst = null;
    function check(){
        if(length(lst) >= 3){
            const three = head(lst) + list_ref(lst, 1) + list_ref(lst, 2);
            if(three === "GAT" || three === "AAT" || three === "AGT"){
                return true;
            }
        }
        return false;
    }
    function process(x, y){
        if(check()){
            return lst;
        } else {
            lst = pair(x, lst);
            return lst;
        }
    }
    accumulate(process, lst, reverse(strand));
    if(check()){
        return list(reverse(tail(tail(tail(lst)))));
    } else {
        return null;
    }
}
function all_genes(strand){
    let ans = null;
    let now = strand;
    function find_next(str){
        return display(find_gene_end(head(find_gene_start(str))));
    }
    while(!(is_null(find_next(now)))){
        ans = append(ans, find_next(now));
        now = head(find_gene_start(now));
    }
    return ans;
}
function all_differen(nums){
    let N = length(nums);
    let arr = [];
    let i = 0;
    while(!is_null(nums)){
        arr[i] = head(nums);
        i = i + 1;
        nums = tail(nums);
    }
    for(let i = 0; i < N ; i = i + 1){
        for(let j = i + 1; j < N; j = j + 1){
            if(arr[i] === arr[j]){
                return false;
            }
        }
    }
    return true;
}
function is_valid_toto_set(nums, n, min ,max){
    let N = length(nums);
    if(!(N === n && all_differen(nums))){
        return false;
    }
    function is_in(x){
        return x >= min && x <= max;
    } 
    function process(x, bool){
        return is_in(x) && bool;
    }
    return accumulate(process, true, nums);
}
function num_of_matches(numsA, numsB){
    let N1 = length(numsA);
    let arr1 = [];
    let i = 0;
    while(!is_null(numsA)){
        arr1[i] = head(numsA);
        i = i + 1;
        numsA = tail(numsA);
    }
    let N2 = length(numsB);
    let arr2 = [];
    i = 0;
    while(!is_null(numsB)){
        arr2[i] = head(numsB);
        i = i + 1;
        numsB = tail(numsB);
    } 
    let cout = 0;
    for(let i = 0; i < N1; i = i + 1){
        for(let j = 0; j < N2; j = j + 1){
            if(arr1[i] === arr2[j]){
                cout = cout + 1;
            }
        }
    }
    return cout;
}
function check_winning_group(bet_nums, draw_nums, extra_num){
    const N = length(bet_nums);
    const mat = num_of_matches(bet_nums, draw_nums);
    const mat2 = num_of_matches(bet_nums, list(extra_num));
    const point = mat + mat2 / 2;
    if(point === N){
        return 1;
    } else if(point === N - 0.5){
        return 2;
    } else if(point === N - 1){
        return 3;
    } else if(point === N - 1.5){
        return 4;
    } else if(point === N - 2){
        return 5;
    } else {
        return 0;
    }
}
function evaluate_BAE_tree(tree){
    if(is_number(tree)){
        return tree;
    }
    function operate(pl, pr, op){
        return op === "+" ? pl + pr 
             : op === "-" ? pl - pr 
             : op === "*" ? pl * pr
             : op === "/" ? pl / pr : error();
    }
    return operate(evaluate_BAE_tree(head(tree)),
                   evaluate_BAE_tree(list_ref(tree, 2)),
                   list_ref(tree, 1));
}
function build_BAE_tree(lst){
    if(is_number(head(lst))){
        return head(lst);
    }
    let ans = null;
    let layer = 0;
    lst = tail(lst);
    function load(to, item, lay){
        if(is_null(to)){
            ans = pair(item, null);
            return 0;
        }
        while(!is_null(tail(to))){
            to = tail(to);
        }
        if(lay === 0){
            set_tail(to, pair(item, null));
        } else {
            if(is_null(head(to))){
                set_head(to, pair(item, null));
            } else {
                load(head(to), item, lay - 1);
            }
        }
    }
    while(!is_null(lst)){
        let char = head(lst);
        if(char === "("){
            load(ans, null, layer);
            layer = layer + 1;
        } else if (char === ")"){
            layer = layer - 1;
        } else {
            load(ans, char, layer);
        }
        lst = tail(lst);
    }
    return ans;
}
function evaluate_BAE(bae_list){
    return evaluate_BAE_tree(build_BAE_tree(bae_list));
}
function check_parentheses(lst){
    let count = 0;
    while(!is_null(lst)){
        if(head(lst) === "("){
            count = count + 1;
        } else {
            count = count - 1;
        }
        if(count < 0){
            return false;
        } else {
            lst = tail(lst);   
        }
    }
    if(count !== 0){
        return false;
    }
    return true;
}
