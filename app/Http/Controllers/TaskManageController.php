<?php

namespace App\Http\Controllers;

use App\Models\TaskManage;
use Illuminate\Http\Request;

class TaskManageController extends Controller
{
    public function index()
    {
        $tasks = TaskManage::latest()->get();

        return response()->json([
            'tasks' => $tasks
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,medium,high',
            'due_date' => 'nullable|date',
        ]);

        
        $validated['status'] = 'pending';

            $validated['user_id'] = $request->user()->id;

        $task = TaskManage::create($validated);

        return response()->json([
            'message' => 'Task created successfully',
            'task' => $task
        ], 201);
    }

    public function show($id)
    {
        $task = TaskManage::find($id);

        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        return response()->json(['task' => $task]);
    }

    public function update(Request $request, $id)
    {
        $task = TaskManage::find($id);

        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        $task->update($request->only([
            'title',
            'description',
            'status',
            'priority',
            'due_date'
        ]));

        return response()->json([
            'message' => 'Task updated successfully',
            'task' => $task
        ], 200);
    }

    public function destroy($id)
    {
        $task = TaskManage::find($id);

        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        $task->delete();

        return response()->json([
            'message' => 'Task deleted successfully'
        ]);
    }
}