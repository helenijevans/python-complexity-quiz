const templates = [
  {
    id: "sum_list",
    weight: 8,
    group: "linear",
    difficulty: "Beginner",
    time: "O(n)",
    space: "O(1)",
    filename: "score_report.py",
    code: `def total_scores(scores):
    total = 0
    for score in scores:
        total += score
    return total`,
    explain: "The loop visits each score once, so the running time grows linearly with n. Only one running total is stored, so extra space stays constant."
  },
  {
    id: "copy_positive",
    weight: 7,
    group: "linear",
    difficulty: "Beginner",
    time: "O(n)",
    space: "O(n)",
    filename: "number_filter.py",
    code: `def positive_numbers(values):
    result = []
    for value in values:
        if value > 0:
            result.append(value)
    return result`,
    explain: "Every value is checked once, giving O(n) time. In the worst case every value is copied into result, so the new list can grow to size n."
  },
  {
    id: "first_even",
    weight: 6,
    group: "linear",
    difficulty: "Beginner",
    time: "O(n)",
    space: "O(1)",
    filename: "number_lookup.py",
    code: `def first_even(numbers):
    for number in numbers:
        if number % 2 == 0:
            return number
    return None`,
    explain: "The best case is fast, but Big O usually describes the worst case. If no even number appears until the end, the loop checks all n items. It stores only a few variables."
  },
  {
    id: "two_separate",
    weight: 6,
    group: "linear",
    difficulty: "Beginner",
    time: "O(n)",
    space: "O(1)",
    filename: "range_summary.py",
    code: `def min_and_max(values):
    smallest = values[0]
    largest = values[0]

    for value in values:
        if value < smallest:
            smallest = value

    for value in values:
        if value > largest:
            largest = value

    return smallest, largest`,
    explain: "There are two separate loops over the same input, so the work is n + n, which simplifies to O(n). The function keeps only two tracked values."
  },
  {
    id: "constant_slice",
    weight: 5,
    group: "linear",
    difficulty: "Beginner",
    time: "O(1)",
    space: "O(1)",
    filename: "sample_items.py",
    code: `def first_three(items):
    result = []
    for i in range(3):
        result.append(items[i])
    return result`,
    explain: "The loop always runs exactly 3 times, no matter how large items is. A list of 3 items is still constant extra space."
  },
  {
    id: "reverse_copy",
    weight: 6,
    group: "linear",
    difficulty: "Beginner",
    time: "O(n)",
    space: "O(n)",
    filename: "copy_items.py",
    code: `def reverse_copy(items):
    output = []
    for i in range(len(items) - 1, -1, -1):
        output.append(items[i])
    return output`,
    explain: "The loop appends one value for each input item, so time is O(n). The returned list stores n copied references, so extra space is O(n)."
  },
  {
    id: "binary_search",
    weight: 4,
    group: "logs",
    difficulty: "Logs",
    time: "O(log n)",
    space: "O(1)",
    filename: "value_lookup.py",
    code: `def contains(sorted_values, target):
    left = 0
    right = len(sorted_values) - 1

    while left <= right:
        middle = (left + right) // 2
        if sorted_values[middle] == target:
            return True
        if sorted_values[middle] < target:
            left = middle + 1
        else:
            right = middle - 1

    return False`,
    explain: "Each loop cuts the remaining search range roughly in half, so the number of checks is logarithmic. The indexes use constant space."
  },
  {
    id: "halve_until_one",
    weight: 4,
    group: "logs",
    difficulty: "Logs",
    time: "O(log n)",
    space: "O(1)",
    filename: "step_counter.py",
    code: `def count_halves(n):
    steps = 0
    while n > 1:
        n = n // 2
        steps += 1
    return steps`,
    explain: "The value of n is divided by 2 each time. Repeated halving produces O(log n) iterations and the function stores only counters."
  },
  {
    id: "sort_then_scan",
    weight: 4,
    group: "logs",
    difficulty: "Mixed",
    time: "O(n log n)",
    space: "O(n)",
    filename: "ordered_report.py",
    code: `def sorted_total(values):
    ordered = sorted(values)
    total = 0
    for value in ordered:
        total += value
    return total`,
    explain: "Sorting dominates the later linear scan, so the time is O(n log n). sorted(values) creates a new list containing n items."
  },
  {
    id: "pair_sums",
    weight: 6,
    group: "loops",
    difficulty: "Nested",
    time: "O(n^2)",
    space: "O(n^2)",
    filename: "sum_report.py",
    code: `def pair_sums(numbers):
    sums = []
    for a in numbers:
        for b in numbers:
            sums.append(a + b)
    return sums`,
    explain: "For each of n choices of a, the inner loop runs n times, giving n * n operations. The result list also stores n squared sums."
  },
  {
    id: "has_duplicate",
    weight: 6,
    group: "loops",
    difficulty: "Nested",
    time: "O(n^2)",
    space: "O(1)",
    filename: "find_duplicates.py",
    code: `def has_duplicate(items):
    for i in range(len(items)):
        for j in range(i + 1, len(items)):
            if items[i] == items[j]:
                return True
    return False`,
    explain: "The nested loops compare pairs of items. The exact count is about n squared divided by 2, which still simplifies to O(n^2). No growing data structure is created."
  },
  {
    id: "grid_count",
    weight: 10,
    group: "loops",
    difficulty: "Nested",
    time: "O(n * m)",
    space: "O(1)",
    filename: "grid_report.py",
    code: `def count_zeros(grid):
    count = 0
    for row in grid:
        for value in row:
            if value == 0:
                count += 1
    return count`,
    explain: "If the grid has n rows and m columns, the inner body runs n * m times. The counter uses constant extra space."
  },
  {
    id: "two_inputs",
    weight: 10,
    group: "linear",
    difficulty: "Mixed",
    time: "O(n + m)",
    space: "O(n)",
    filename: "name_report.py",
    code: `def missing_names(expected, arrived):
    arrived_set = set(arrived)
    missing = []

    for name in expected:
        if name not in arrived_set:
            missing.append(name)

    return missing`,
    explain: "Building the set from arrived takes O(m), then scanning expected takes O(n). The set can hold m names and missing can hold n names, so extra space is O(n + m).",
    preciseSpace: "O(n + m)"
  },
  {
    id: "matrix_build",
    weight: 5,
    group: "loops",
    difficulty: "Nested",
    time: "O(n^2)",
    space: "O(n^2)",
    filename: "grid_builder.py",
    code: `def identity_grid(n):
    grid = []
    for row in range(n):
        line = []
        for col in range(n):
            if row == col:
                line.append(1)
            else:
                line.append(0)
        grid.append(line)
    return grid`,
    explain: "The function fills an n by n grid, so both the work and the returned data contain n squared cells."
  },
  {
    id: "triples",
    weight: 3,
    group: "loops",
    difficulty: "Challenge",
    time: "O(n^3)",
    space: "O(1)",
    filename: "match_counter.py",
    code: `def count_triples(numbers):
    count = 0
    for a in numbers:
        for b in numbers:
            for c in numbers:
                if a + b == c:
                    count += 1
    return count`,
    explain: "There are three nested loops over the same n items, so the body can run n * n * n times. The only extra storage is the counter."
  },
  {
    id: "cube_table",
    weight: 3,
    group: "loops",
    difficulty: "Challenge",
    time: "O(n^3)",
    space: "O(n^3)",
    filename: "table_builder.py",
    code: `def cube_table(n):
    table = []
    for x in range(n):
        plane = []
        for y in range(n):
            row = []
            for z in range(n):
                row.append(x + y + z)
            plane.append(row)
        table.append(plane)
    return table`,
    explain: "The code builds n layers, each with n rows and n values. That is n cubed work and n cubed returned values."
  },
  {
    id: "recursive_fib",
    weight: 2,
    group: "logs",
    difficulty: "Challenge",
    time: "O(2^n)",
    space: "O(n)",
    filename: "sequence_value.py",
    code: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)`,
    explain: "Each call branches into two smaller calls, creating exponential repeated work. The call stack only goes as deep as n at one time."
  },
  {
    id: "permutations",
    weight: 1,
    group: "logs",
    difficulty: "Challenge",
    time: "O(n!)",
    space: "O(n!)",
    filename: "list_builder.py",
    code: `def permutations(items):
    if len(items) == 0:
        return [[]]

    result = []
    for i in range(len(items)):
        rest = items[:i] + items[i + 1:]
        for perm in permutations(rest):
            result.append([items[i]] + perm)
    return result`,
    explain: "The function generates every ordering of the input, and there are n factorial orderings. Returning all of them also takes factorial space."
  },
  {
    id: "n_square_plus_m",
    weight: 6,
    group: "logs",
    difficulty: "Mixed",
    time: "O(n^2 + m)",
    space: "O(m)",
    filename: "summary_copy.py",
    code: `def compare_then_copy(numbers, labels):
    matches = 0
    for a in numbers:
        for b in numbers:
            if a == b:
                matches += 1

    copied_labels = []
    for label in labels:
        copied_labels.append(label)

    return matches, copied_labels`,
    explain: "The nested loops over numbers cost O(n^2). The separate labels loop costs O(m), so the full time is O(n^2 + m). The copied labels list uses O(m) extra space."
  },
  {
    id: "count_target",
    weight: 7,
    group: "linear",
    difficulty: "Beginner",
    time: "O(n)",
    space: "O(1)",
    filename: "target_counter.py",
    code: `def count_target(values, target):
    count = 0
    for value in values:
        if value == target:
            count += 1
    return count`,
    explain: "The loop checks each of the n values once. The only extra storage is the counter, so space stays constant."
  },
  {
    id: "copy_squares",
    weight: 6,
    group: "linear",
    difficulty: "Beginner",
    time: "O(n)",
    space: "O(n)",
    filename: "square_report.py",
    code: `def square_values(values):
    squares = []
    for value in values:
        squares.append(value * value)
    return squares`,
    explain: "One square is calculated for each input value, giving O(n) time. The output list grows to n values."
  },
  {
    id: "last_item",
    weight: 6,
    group: "linear",
    difficulty: "Beginner",
    time: "O(1)",
    space: "O(1)",
    filename: "last_lookup.py",
    code: `def last_item(items):
    if len(items) == 0:
        return None
    return items[len(items) - 1]`,
    explain: "The function uses direct indexing and does not loop over the list. It stores only a constant number of temporary values."
  },
  {
    id: "running_totals",
    weight: 6,
    group: "linear",
    difficulty: "Beginner",
    time: "O(n)",
    space: "O(n)",
    filename: "running_totals.py",
    code: `def running_totals(values):
    totals = []
    current = 0
    for value in values:
        current += value
        totals.append(current)
    return totals`,
    explain: "The loop performs constant work for each value. The returned totals list contains one entry per input value."
  },
  {
    id: "in_place_double",
    weight: 6,
    group: "linear",
    difficulty: "Beginner",
    time: "O(n)",
    space: "O(1)",
    filename: "double_items.py",
    code: `def double_in_place(values):
    for i in range(len(values)):
        values[i] = values[i] * 2
    return values`,
    explain: "Each list position is updated once, so time is O(n). The list is modified in place, so no extra structure grows with n."
  },
  {
    id: "make_frequency_table",
    weight: 7,
    group: "linear",
    difficulty: "Mixed",
    time: "O(n)",
    space: "O(n)",
    filename: "frequency_table.py",
    code: `def frequency_table(items):
    counts = {}
    for item in items:
        if item not in counts:
            counts[item] = 0
        counts[item] += 1
    return counts`,
    explain: "The loop processes n items. In the worst case, every item is unique, so the dictionary can grow to n entries."
  },
  {
    id: "merge_sorted_lists",
    weight: 7,
    group: "linear",
    difficulty: "Mixed",
    time: "O(n + m)",
    space: "O(n + m)",
    filename: "merge_lists.py",
    code: `def merge_sorted(left, right):
    merged = []
    i = 0
    j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1

    while i < len(left):
        merged.append(left[i])
        i += 1

    while j < len(right):
        merged.append(right[j])
        j += 1

    return merged`,
    explain: "Each item from both input lists is copied once, so time is O(n + m). The merged output stores all n + m items."
  },
  {
    id: "membership_intersection",
    weight: 8,
    group: "linear",
    difficulty: "Mixed",
    time: "O(n + m)",
    space: "O(n)",
    filename: "shared_items.py",
    code: `def shared_items(first, second):
    seen = set(first)
    shared = []
    for item in second:
        if item in seen:
            shared.append(item)
    return shared`,
    explain: "Building the set costs O(n), then scanning the second list costs O(m). The set and returned list can grow with the input sizes.",
    preciseSpace: "O(n + m)"
  },
  {
    id: "nested_constant_inner",
    weight: 4,
    group: "linear",
    difficulty: "Mixed",
    time: "O(n)",
    space: "O(1)",
    filename: "small_window.py",
    code: `def three_day_totals(values):
    best = 0
    for i in range(len(values) - 2):
        total = 0
        for j in range(3):
            total += values[i + j]
        if total > best:
            best = total
    return best`,
    explain: "Although there is a nested loop, the inner loop always runs exactly 3 times. That makes the total work linear, and the function stores only counters."
  },
  {
    id: "all_prefixes",
    weight: 5,
    group: "loops",
    difficulty: "Nested",
    time: "O(n^2)",
    space: "O(n^2)",
    filename: "prefix_builder.py",
    code: `def all_prefixes(items):
    prefixes = []
    for end in range(1, len(items) + 1):
        prefix = []
        for i in range(end):
            prefix.append(items[i])
        prefixes.append(prefix)
    return prefixes`,
    explain: "The function builds prefixes of length 1 through n. The total copied values are 1 + 2 + ... + n, which is O(n^2), and the returned lists store that many values."
  },
  {
    id: "selection_sort",
    weight: 4,
    group: "loops",
    difficulty: "Nested",
    time: "O(n^2)",
    space: "O(1)",
    filename: "selection_sort.py",
    code: `def selection_sort(values):
    for i in range(len(values)):
        smallest = i
        for j in range(i + 1, len(values)):
            if values[j] < values[smallest]:
                smallest = j
        values[i], values[smallest] = values[smallest], values[i]
    return values`,
    explain: "For each position, the remaining list is scanned to find the smallest value. The nested scans give O(n^2) time, while swaps happen in place."
  },
  {
    id: "matrix_transpose",
    weight: 7,
    group: "loops",
    difficulty: "Nested",
    time: "O(n * m)",
    space: "O(n * m)",
    filename: "transpose_grid.py",
    code: `def transpose(grid):
    output = []
    for col in range(len(grid[0])):
        new_row = []
        for row in range(len(grid)):
            new_row.append(grid[row][col])
        output.append(new_row)
    return output`,
    explain: "Every cell in the n by m grid is read once and copied into the output. Both the work and output size are O(n * m)."
  },
  {
    id: "flatten_grid",
    weight: 8,
    group: "loops",
    difficulty: "Nested",
    time: "O(n * m)",
    space: "O(n * m)",
    filename: "flatten_grid.py",
    code: `def flatten(grid):
    values = []
    for row in grid:
        for value in row:
            values.append(value)
    return values`,
    explain: "The nested loops visit every cell in the grid. The returned list stores every cell, so both time and space are O(n * m)."
  },
  {
    id: "diagonal_sum",
    weight: 6,
    group: "linear",
    difficulty: "Mixed",
    time: "O(n)",
    space: "O(1)",
    filename: "diagonal_sum.py",
    code: `def diagonal_sum(grid):
    total = 0
    for i in range(len(grid)):
        total += grid[i][i]
    return total`,
    explain: "Only one cell is read from each of n rows, so the loop runs n times. The total and index use constant extra space."
  },
  {
    id: "binary_insert_position",
    weight: 4,
    group: "logs",
    difficulty: "Logs",
    time: "O(log n)",
    space: "O(1)",
    filename: "insert_position.py",
    code: `def insert_position(sorted_values, target):
    left = 0
    right = len(sorted_values)

    while left < right:
        middle = (left + right) // 2
        if sorted_values[middle] < target:
            left = middle + 1
        else:
            right = middle

    return left`,
    explain: "Each loop halves the remaining search range. Only index variables are stored."
  },
  {
    id: "power_loop",
    weight: 4,
    group: "logs",
    difficulty: "Logs",
    time: "O(log n)",
    space: "O(1)",
    filename: "power_counter.py",
    code: `def powers_until(limit):
    value = 1
    count = 0
    while value < limit:
        value *= 2
        count += 1
    return count`,
    explain: "The value doubles each time, so it takes logarithmic iterations to reach the limit. The function stores only two numbers."
  },
  {
    id: "split_until_empty",
    weight: 3,
    group: "logs",
    difficulty: "Logs",
    time: "O(log n)",
    space: "O(log n)",
    filename: "recursive_split.py",
    code: `def split_count(n):
    if n <= 1:
        return 1
    return 1 + split_count(n // 2)`,
    explain: "Each recursive call halves n, so the number of calls is O(log n). The call stack also has logarithmic depth."
  },
  {
    id: "sorted_unique",
    weight: 4,
    group: "logs",
    difficulty: "Mixed",
    time: "O(n log n)",
    space: "O(n)",
    filename: "unique_report.py",
    code: `def sorted_unique(values):
    ordered = sorted(values)
    unique = []
    for value in ordered:
        if len(unique) == 0 or unique[-1] != value:
            unique.append(value)
    return unique`,
    explain: "Sorting costs O(n log n), which dominates the later linear pass. The sorted copy and unique list can each grow with n."
  },
  {
    id: "sort_each_row",
    weight: 5,
    group: "logs",
    difficulty: "Mixed",
    time: "O(n * m)",
    space: "O(n * m)",
    filename: "row_sorter.py",
    code: `def copy_rows(grid):
    copied = []
    for row in grid:
        copied.append(list(row))
    return copied`,
    explain: "Each of the n rows contains m values, and every value is copied once. The returned grid also stores n * m values."
  },
  {
    id: "quadratic_then_linear_space",
    weight: 5,
    group: "loops",
    difficulty: "Nested",
    time: "O(n^2)",
    space: "O(n)",
    filename: "pair_flags.py",
    code: `def has_larger_after(values):
    result = []
    for i in range(len(values)):
        found = False
        for j in range(i + 1, len(values)):
            if values[j] > values[i]:
                found = True
        result.append(found)
    return result`,
    explain: "The nested comparisons give O(n^2) time. The returned result list has one boolean for each input item, so space is O(n)."
  },
  {
    id: "two_independent_loops",
    weight: 9,
    group: "linear",
    difficulty: "Mixed",
    time: "O(n + m)",
    space: "O(1)",
    filename: "two_totals.py",
    code: `def two_totals(numbers, prices):
    number_total = 0
    for number in numbers:
        number_total += number

    price_total = 0
    for price in prices:
        price_total += price

    return number_total, price_total`,
    explain: "The first loop scans n numbers and the second scans m prices, so time is O(n + m). Only two totals are stored."
  },
  {
    id: "copy_second_input",
    weight: 8,
    group: "linear",
    difficulty: "Mixed",
    time: "O(n + m)",
    space: "O(m)",
    filename: "copy_labels.py",
    code: `def count_and_copy(numbers, labels):
    count = 0
    for number in numbers:
        if number > 0:
            count += 1

    copied = []
    for label in labels:
        copied.append(label)

    return count, copied`,
    explain: "The function scans n numbers and m labels, giving O(n + m) time. Only the copied labels list grows, so extra space is O(m)."
  },
  {
    id: "all_pairs_until_match",
    weight: 5,
    group: "loops",
    difficulty: "Nested",
    time: "O(n^2)",
    space: "O(1)",
    filename: "pair_search.py",
    code: `def has_pair_sum(numbers, target):
    for i in range(len(numbers)):
        for j in range(i + 1, len(numbers)):
            if numbers[i] + numbers[j] == target:
                return True
    return False`,
    explain: "A match might not exist, so the worst case checks all pairs. That is O(n^2) time with only loop indexes stored."
  },
  {
    id: "pair_table",
    weight: 4,
    group: "loops",
    difficulty: "Nested",
    time: "O(n^2)",
    space: "O(n^2)",
    filename: "pair_table.py",
    code: `def pair_table(items):
    table = []
    for left in items:
        row = []
        for right in items:
            row.append((left, right))
        table.append(row)
    return table`,
    explain: "The function creates one pair for every combination of left and right items. That produces n squared work and n squared stored pairs."
  },
  {
    id: "triple_copy",
    weight: 3,
    group: "loops",
    difficulty: "Challenge",
    time: "O(n^3)",
    space: "O(n^3)",
    filename: "triple_table.py",
    code: `def triple_table(items):
    triples = []
    for a in items:
        for b in items:
            for c in items:
                triples.append((a, b, c))
    return triples`,
    explain: "Three nested loops create every ordered triple of n items. The returned list also contains n cubed triples."
  },
  {
    id: "triple_counter",
    weight: 3,
    group: "loops",
    difficulty: "Challenge",
    time: "O(n^3)",
    space: "O(1)",
    filename: "triple_counter.py",
    code: `def count_ordered_triples(items):
    count = 0
    for a in items:
        for b in items:
            for c in items:
                count += 1
    return count`,
    explain: "The three nested loops run n * n * n times. Since the function returns only a count, extra space is constant."
  },
  {
    id: "recursive_factorial",
    weight: 3,
    group: "logs",
    difficulty: "Mixed",
    time: "O(n)",
    space: "O(n)",
    filename: "factorial_value.py",
    code: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)`,
    explain: "The recursion makes one call for each value from n down to 1. The call stack grows to depth n."
  },
  {
    id: "recursive_countdown",
    weight: 4,
    group: "linear",
    difficulty: "Mixed",
    time: "O(n)",
    space: "O(n)",
    filename: "countdown.py",
    code: `def countdown(n):
    if n == 0:
        return []
    rest = countdown(n - 1)
    rest.append(n)
    return rest`,
    explain: "There is one recursive call per number from n to 0, and the returned list grows to n items. The stack also grows linearly."
  },
  {
    id: "exponential_subsets",
    weight: 2,
    group: "logs",
    difficulty: "Challenge",
    time: "O(2^n)",
    space: "O(2^n)",
    filename: "subset_builder.py",
    code: `def subsets(items):
    if len(items) == 0:
        return [[]]

    rest = subsets(items[1:])
    result = []
    for group in rest:
        result.append(group)
        result.append([items[0]] + group)
    return result`,
    explain: "Each item can be either included or excluded, producing 2^n subsets. Returning all subsets also takes exponential space."
  },
  {
    id: "linear_recursion_constant_return",
    weight: 4,
    group: "linear",
    difficulty: "Mixed",
    time: "O(n)",
    space: "O(n)",
    filename: "recursive_sum.py",
    code: `def recursive_sum(values, index):
    if index == len(values):
        return 0
    return values[index] + recursive_sum(values, index + 1)`,
    explain: "The function makes one recursive call per input value. Even though it returns one number, the call stack grows to n frames."
  },
  {
    id: "factorial_permutation_count",
    weight: 1,
    group: "logs",
    difficulty: "Challenge",
    time: "O(n!)",
    space: "O(n)",
    filename: "permutation_counter.py",
    code: `def count_permutations(items):
    if len(items) == 0:
        return 1

    total = 0
    for i in range(len(items)):
        rest = items[:i] + items[i + 1:]
        total += count_permutations(rest)
    return total`,
    explain: "The recursion explores every possible ordering, so the work is factorial. The deepest call chain has length n, so stack space is O(n)."
  }
];
