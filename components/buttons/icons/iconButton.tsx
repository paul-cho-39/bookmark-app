import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle, TouchableOpacityProps } from 'react-native';

export interface IconButtonProps extends TouchableOpacityProps {
   renderIcon: () => React.ReactNode;
   backgroundColor?: string;
   children?: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({
   renderIcon,
   backgroundColor,
   children,
   ...rest
}) => {
   return (
      <TouchableOpacity
         style={[
            { backgroundColor: backgroundColor },
            rest.style, // Allow user to pass in additional styles
         ]}
         {...rest}
      >
         {renderIcon()}
         {children}
      </TouchableOpacity>
   );
};

export default IconButton;

// //  graph based algorithms
// //  recursive approach much cleaner
// const depthFirst = (graph, element) => {
//    console.log(element);
//    for (let neighbor of graph[element]) {
//       depthFirst(graph, neighbor);
//    }
// }

// // iterative approach
// function depthFirstIterative(graph, element) {
//    const stack = [element];
//    while (stack.length > 0) {
//       const current = stack.pop();
//       console.log(current);
//       for (let neighbor of graph[current]) {
//          stack.push(neighbor);
//       }
//    }
// }

// // breadthFirst traversal for graphbased algorithm is only possible w/ iteratively
// // demands queue meaning simple shift() and push()
// function breadthFirst(graph, element) {
//    // first in first out
//    const queue = [element];
//    while (queue.length > 0) {
//       const current = queue.shift() // delete the FIRST since its first in first out
//       console.log(current);
//       for (let neighbor of graph[current]) {
//          queue.push(neighbor);
//       }
//    }
// }

// // looking for a value
// // need a cache?
// function findIdWithDepthFirst(graph, start, dest) {
//    const cache = {};
//    if (start === dest) return true
//    const stack = [start];
//    while (stack.length > 0) {
//       const current = stack.pop();
//       if (stack.includes(dest)) return true;
//       for (let neighbor of graph[current]) {
//          stack.push(neighbor);
//       }
//    }
//    return false;
// }

// function findDepthFirstWithRecursive(graph, start, dest) {
//    if (start === dest) return true;
//    for (let neighbor of graph[start]) {
//       if (findDepthFirstWithRecursive(graph, neighbor, dest) === true) return true;
//    }
//    return false;
// }

// function FindWithbreadthFirst(graph, element, dest) {
//    // create an array
//    const queue = [element];
//    while (queue.length > 0) {
//       const current = queue.shift();

//    }
// }

// function convertToAdjanceyList(graphs: string[][]) {
//    // create a new Map
//    const list = {};
//    // 1) loop through each of the array
//    for (let graph of graphs) {
//       for (let g of graph) {
//          const tempSet = new Set();
//          if (!(list[g])) {
//             // initialize an array
//             list[g] = tempSet;
//          }
//          const notG = graph.filter((i) => i !== g).toString();
//          list[g].add(notG);
//       }
//    }
// }

// breadth first
// function breadFirst(graphs: string[], start: string, dest: string, memo: Set<string>) {
//    const queue = [start];
//    memo.add(start);

//    while (queue.length > 0) {
//       // take out the first element from the array
//       const current = queue.shift()

//       if (current === dest) return true;

//       for (let neighbor of graph[current]) {
//          if (!memo.has(neighbor)) {
//             memo.add(neighbor);
//             queue.push(neighbor);
//          }
//       }
//    }
//    return false;
// }

// // depth first
// function hasPath(graphs, start, dest) {
//    const memo = new Set();

//    if (start === dest) return true;
//    if (memo.has(start)) return false;

//    // recursive is using a for... loop?
//    for (let neighbor of graphs[start]) {
//       if (hasPath(graphs, neighbor, dest) === true) return true;

//       memo.add(neighbor);
//    }
//    return false;
// }

// function countTraversal(graphs: {[key: string]: string[]}[]) {
//    // initiate a global cache
//    const cache = new Set();
//    const queue = [graphs[0][0]] // whereever it wants to start
//    let count = 0;

//    function traverseTillEnd() {
//       while (queue.length > 0) {
//          const current = queue.shift();
//          for (let neighbor of graphs[current]) {
//             if (!cache.has(neighbor)) {
//                cache.add(neighbor);
//                queue.push(neighbor);
//             }
//          }
//       }
//       return count++;
//    }

//    // loop over each of the key?
//    for (let graph of graphs) {
//       const key = Object.keys(graph)[0]
//       if (!cache.has(key)) {
//          traverseTillEnd();
//       }
//    }
//    return count;
// }

// // now turn the above code into depth-firs tinstead of breadth-first

// // permutations with repetitions
// function permutateStringsRepetition(str: string) {
//    const strLength = str.length;
//    const permutation: string[] = [];
//    if (strLength === 1) { return permutation.map((str) => [str]) }
//    const strToArray = str.split("");

//    const smallerPermutations = permutateStringsRepetition(str.slice(0, strLength - 1))

//    strToArray.forEach((wholeString) => {
//       smallerPermutations?.forEach((permutate) => {
//          permutation.push([wholeString].concat(permutate));
//       })
//    })

//    return permutation;
// }

// // permutation without repetition
// function permutationWithoutRepetitions(str: string | string[]) {
//    // const stringToArray = str.split("");
//    if (typeof str === "string") {
//       str = str.split("");
//    }
//    if (str.length === 1) {
//       return [str];
//    }

//    const permutations = [];
//    // after creating a permutation for repetitions

//    const smallerPermutations = permutationWithoutRepetitions(str.slice(1));

//    const firstOfTheString = str[0];

//    for (let i= 0; i < smallerPermutations?.length; i++) {
//       const smallerPermutation = smallerPermutations[i];

//       for (let j=0; j <= smallerPermutation.length; j++) {
//          const prefix = smallerPermutation.slice(0, j);
//          const suffix = smallerPermutation.slice(j);
//          permutations.push(prefix.concat([firstOfTheString], suffix));
//       }
//    };

//    return permutations;
// }

function depthFirstTraversal(graphs: Record<string, string>[], current: string) {
   console.log(current);
   for (let graph of graphs) {
      depthFirstTraversal(graphs, graph[current]);
   }
}
